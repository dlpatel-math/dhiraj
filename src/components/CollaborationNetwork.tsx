import { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { publications } from '../data/research';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  count: number;
  isMain?: boolean;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
}

export default function CollaborationNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const graphData = useMemo(() => {
    const nodesMap = new Map<string, number>();
    const linksMap = new Map<string, number>();
    const mainAuthor = "D. Patel";

    publications.forEach(pub => {
      const authors = pub.authors.split(', ').map(a => a.trim());
      authors.forEach(author => {
        if (author !== mainAuthor) {
          nodesMap.set(author, (nodesMap.get(author) || 0) + 1);
          linksMap.set(author, (linksMap.get(author) || 0) + 1);
        }
      });
    });

    const nodes: Node[] = [
      { id: mainAuthor, count: publications.length, isMain: true },
      ...Array.from(nodesMap.entries()).map(([id, count]) => ({ id, count }))
    ];

    const links: Link[] = Array.from(linksMap.entries()).map(([target, value]) => ({
      source: mainAuthor,
      target: target,
      value: value
    }));

    return { nodes, links };
  }, []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    const container = containerRef.current;
    
    const updateSize = () => {
      const width = container.clientWidth;
      const height = 500;

      svg.attr('viewBox', `0 0 ${width} ${height}`);

      // Clear previous content
      svg.selectAll('*').remove();

      const g = svg.append('g');

      // Zoom behavior
      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 3])
        .filter(event => {
          // Disable scroll wheel zoom unless Ctrl is pressed
          // This prevents the visualization from intercepting page scroll
          if (event.type === 'wheel') return event.ctrlKey;
          return !event.ctrlKey && !event.button;
        })
        .on('zoom', (event) => {
          g.attr('transform', event.transform);
        });

      svg.call(zoom);

      const simulation = d3.forceSimulation<Node>(graphData.nodes)
        .force('link', d3.forceLink<Node, Link>(graphData.links).id(d => d.id).distance(150))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => (d as Node).isMain ? 40 : 25));

      const link = g.append('g')
        .attr('stroke', '#ccc')
        .attr('stroke-opacity', 0.6)
        .selectAll('line')
        .data(graphData.links)
        .join('line')
        .attr('stroke-width', d => Math.sqrt((d as Link).value) * 3);

      const nodeGroup = g.append('g')
        .selectAll('g')
        .data(graphData.nodes)
        .join('g')
        .call(d3.drag<SVGGElement, Node>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) as any);

      nodeGroup.append('circle')
        .attr('r', d => (d as Node).isMain ? 15 : 8 + ((d as Node).count * 2))
        .attr('fill', d => (d as Node).isMain ? '#0563bb' : '#45e1d1')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('box-shadow', '0 4px 6px -1px rgb(0 0 0 / 0.1)');

      nodeGroup.append('text')
        .attr('dy', d => (d as Node).isMain ? 30 : 20)
        .attr('text-anchor', 'middle')
        .text(d => (d as Node).id)
        .attr('font-size', d => (d as Node).isMain ? '14px' : '10px')
        .attr('font-weight', d => (d as Node).isMain ? 'bold' : 'normal')
        .attr('fill', '#272829');

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

    return () => resizeObserver.disconnect();
  }, [graphData]);

  const resetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const zoom = d3.zoom<SVGSVGElement, unknown>();
    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-black/5 p-4 overflow-hidden relative shadow-inner" ref={containerRef}>
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-black/5">
        <h4 className="text-sm font-bold text-brand-primary">Co-authorship Network</h4>
        <p className="text-[10px] text-[#777] mt-0.5">Drag to move • Press Ctrl + Scroll to zoom</p>
      </div>
      <button 
        onClick={resetZoom}
        className="absolute bottom-4 left-4 z-10 px-3 py-1.5 bg-white border border-black/10 rounded-md text-[10px] font-bold text-brand-primary hover:bg-slate-50 shadow-sm transition-all flex items-center gap-1.5"
      >
        <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
        Reset View
      </button>
      <svg ref={svgRef} className="w-full h-[500px] cursor-grab active:cursor-grabbing bg-[#fcfcfc]" />
      <div className="absolute bottom-4 right-4 text-[10px] text-[#999] flex gap-4">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#0563bb]" />
          <span>Principal Researcher</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#45e1d1]" />
          <span>Collaborators</span>
        </div>
      </div>
    </div>
  );
}
