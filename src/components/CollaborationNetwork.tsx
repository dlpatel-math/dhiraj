import { useEffect, useRef, useMemo, useState } from 'react';
import * as d3 from 'd3';
import { publications } from '../data/research';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  count: number;
  isMain?: boolean;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value: number;
}

export default function CollaborationNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [, setHoveredNode] = useState<string | null>(null);

  const graphData = useMemo(() => {
    const nodesMap = new Map<string, number>();
    const linksMap = new Map<string, number>();
    const mainAuthor = "D. Patel";

    publications.forEach(pub => {
      const authors = pub.authors.split(', ').map(a => a.trim());
      
      authors.forEach(author => {
        nodesMap.set(author, (nodesMap.get(author) || 0) + 1);
      });

      for (let i = 0; i < authors.length; i++) {
        for (let j = i + 1; j < authors.length; j++) {
          const a1 = authors[i];
          const a2 = authors[j];
          const linkKey = [a1, a2].sort().join('---');
          linksMap.set(linkKey, (linksMap.get(linkKey) || 0) + 1);
        }
      }
    });

    const nodes: Node[] = Array.from(nodesMap.entries()).map(([id, count]) => ({
      id,
      count,
      isMain: id === mainAuthor
    }));

    const links: Link[] = Array.from(linksMap.entries()).map(([key, value]) => {
      const [source, target] = key.split('---');
      return { source, target, value };
    });

    return { nodes, links };
  }, []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    const container = containerRef.current;
    
    // Create tooltip
    let tooltip = d3.select('#network-tooltip');
    if (tooltip.empty()) {
      tooltip = d3.select('body').append('div')
        .attr('id', 'network-tooltip')
        .attr('class', 'fixed hidden z-[9999] bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl border border-slate-200 text-xs pointer-events-none transition-opacity duration-200');
    }

    const updateSize = () => {
      const width = container.clientWidth;
      const height = 500;

      svg.attr('viewBox', `0 0 ${width} ${height}`);
      svg.selectAll('*').remove();

      const g = svg.append('g');

      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.3, 3])
        .filter(event => {
          if (event.type === 'wheel') return event.ctrlKey;
          return !event.ctrlKey && !event.button;
        })
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });

      svg.call(zoom);

      const simulation = d3.forceSimulation<Node>(graphData.nodes)
        .force('link', d3.forceLink<Node, Link>(graphData.links).id(d => d.id).distance(140))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => (d as Node).isMain ? 60 : 45));

      const maxLinkValue = d3.max(graphData.links, d => (d as Link).value) || 1;

      const link = g.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(graphData.links)
        .join('line')
        .attr('stroke', '#94a3b8')
        .attr('stroke-width', 1.5)
        .attr('stroke-opacity', d => {
          const val = (d as Link).value;
          return 0.1 + (Math.sqrt(val) / Math.sqrt(maxLinkValue)) * 0.7;
        })
        .attr('class', 'transition-all duration-300');

      const nodeGroup = g.append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(graphData.nodes)
        .join('g')
        .attr('class', 'cursor-pointer group')
        .call(d3.drag<SVGGElement, Node>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) as any);

      nodeGroup.append('circle')
        .attr('r', d => (d as Node).isMain ? 28 : Math.min(22, 10 + ((d as Node).count * 2)))
        .attr('fill', d => (d as Node).isMain ? '#0563bb' : '#45e1d1')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2.5)
        .attr('class', 'transition-all duration-300 shadow-sm');

      nodeGroup.append('text')
        .attr('dy', d => (d as Node).isMain ? 35 : 28)
        .attr('text-anchor', 'middle')
        .text(d => (d as Node).id)
        .attr('font-size', d => (d as Node).isMain ? '14px' : '11px')
        .attr('font-weight', d => (d as Node).isMain ? 'bold' : '500')
        .attr('class', 'select-none transition-all duration-300')
        .attr('fill', '#334155');

      // Interactivity
      nodeGroup.on('mouseover', (event, d) => {
        const nodeData = d as Node;
        setHoveredNode(nodeData.id);
        const connectedNodes = new Set<string>([nodeData.id]);
        graphData.links.forEach((l: any) => {
          const sId = typeof l.source === 'string' ? l.source : l.source.id;
          const tId = typeof l.target === 'string' ? l.target : l.target.id;
          if (sId === nodeData.id) connectedNodes.add(tId);
          if (tId === nodeData.id) connectedNodes.add(sId);
        });

        nodeGroup.transition().duration(200).style('opacity', (n: any) => connectedNodes.has(n.id) ? 1 : 0.15);
        link.transition().duration(200).style('opacity', (l: any) => {
          const sId = typeof l.source === 'string' ? l.source : l.source.id;
          const tId = typeof l.target === 'string' ? l.target : l.target.id;
          return sId === nodeData.id || tId === nodeData.id ? 1 : 0.05;
        });

        tooltip.transition().duration(200).style('opacity', 1);
        tooltip.html(`
          <div class="font-bold text-brand-primary line-clamp-1">${(d as Node).id}</div>
          <div class="text-slate-500 text-[10px]">${(d as Node).isMain ? 'Principal Investigator' : 'Co-author'}</div>
          <div class="mt-1.5 flex items-center gap-2">
            <span class="flex items-center justify-center w-5 h-5 rounded-full bg-brand-accent/10 text-brand-accent text-[10px] font-bold">${(d as Node).count}</span>
            <span class="text-[10px] font-medium text-slate-600">Shared Publication${(d as Node).count > 1 ? 's' : ''}</span>
          </div>
        `)
        .style('left', (event.pageX + 15) + 'px')
        .style('top', (event.pageY - 20) + 'px')
        .attr('class', 'fixed block z-[9999] bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl border border-slate-200 text-xs pointer-events-none transition-opacity duration-200');
      })
      .on('mousemove', (event) => {
        tooltip.style('left', (event.pageX + 15) + 'px')
              .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', () => {
        setHoveredNode(null);
        nodeGroup.transition().duration(200).style('opacity', 1);
        link.transition().duration(200).style('opacity', 1);
        tooltip.transition().duration(200).style('opacity', 0);
        setTimeout(() => tooltip.attr('class', 'fixed hidden'), 200);
      });

      simulation.on('tick', () => {
        link
          .attr('x1', (d: any) => d.source.x)
          .attr('y1', (d: any) => d.source.y)
          .attr('x2', (d: any) => d.target.x)
          .attr('y2', (d: any) => d.target.y);

        nodeGroup
          .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
      });

      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(container);
    updateSize();

    return () => {
      resizeObserver.disconnect();
      d3.select('#network-tooltip').remove();
    };
  }, [graphData]);

  const resetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom<SVGSVGElement, unknown>();
    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-black/5 p-4 overflow-hidden relative shadow-inner group/container" ref={containerRef}>
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-black/5 shadow-sm">
        <h4 className="text-sm font-bold text-brand-primary">Collaboration Graph</h4>
        <p className="text-[10px] text-[#777] mt-0.5">Hover for details • Ctrl + Scroll to zoom</p>
      </div>
      
      <button 
        onClick={resetZoom}
        className="absolute bottom-4 left-4 z-10 px-3 py-1.5 bg-white border border-black/10 rounded-md text-[10px] font-bold text-brand-primary hover:bg-slate-50 shadow-sm transition-all flex items-center gap-1.5"
      >
        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
        Reset View
      </button>

      <svg ref={svgRef} className="w-full h-[500px] cursor-grab active:cursor-grabbing bg-[#fcfcfc] rounded-xl" />
      
      <div className="absolute bottom-4 right-4 text-[10px] text-slate-500 flex gap-4 bg-white/80 p-2 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0563bb] border border-white shadow-sm" />
          <span className="font-medium">Principal Researcher</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#45e1d1] border border-white shadow-sm" />
          <span className="font-medium">Collaborators</span>
        </div>
      </div>
    </div>
  );
}
