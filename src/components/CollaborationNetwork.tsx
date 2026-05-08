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
        .attr('stroke-width', d => Math.sqrt(d.value) * 3);

      const nodeGroup = g.append('g')
        .selectAll('g')
        .data(graphData.nodes)
        .join('g')
        .call(d3.drag<SVGGElement, Node>()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended) as any);

      nodeGroup.append('circle')
        .attr('r', d => d.isMain ? 15 : 8 + (d.count * 2))
        .attr('fill', d => d.isMain ? '#0563bb' : '#45e1d1')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('box-shadow', '0 4px 6px -1px rgb(0 0 0 / 0.1)');

      nodeGroup.append('text')
        .attr('dy', d => d.isMain ? 30 : 20)
        .attr('text-anchor', 'middle')
        .text(d => d.id)
        .attr('font-size', d => d.isMain ? '14px' : '10px')
        .attr('font-weight', d => d.isMain ? 'bold' : 'normal')
        .attr('fill', '#272829');

      simulation.on('tick', () => {
        link
          .attr('x1', d => (d.source as any).x)
          .attr('y1', d => (d.source as any).y)
          .attr('x2', d => (d.target as any).x)
          .attr('y2', d => (d.target as any).y);

        nodeGroup
          .attr('transform', d => `translate(${d.x},${d.y})`);
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

  return (
    <div className="w-full bg-white/50 backdrop-blur-sm rounded-2xl border border-black/5 p-4 overflow-hidden relative" ref={containerRef}>
      <div className="absolute top-4 left-4 z-10">
        <h4 className="text-sm font-bold text-brand-primary">Co-authorship Network</h4>
        <p className="text-[10px] text-[#777]">Interactive collaboration structure</p>
      </div>
      <svg ref={svgRef} className="w-full h-[500px] cursor-grab active:cursor-grabbing" />
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
