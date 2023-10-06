// @ts-nocheck
import React from 'react';
import { Scene, Entity, } from 'aframe-react';
import md5 from 'md5';
import json5 from 'json5';

export function getGraphData(deep, links, spaceId) {

  let graphData = { nodes: [], edges: [] };
  console.log({ links });
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const ml = deep.minilinks;

    const focus = link?.inByType?.[deep.idLocal('@deep-foundation/core', 'Focus')]?.find(f => f.from_id === spaceId);
    const isFocusSpace = (link.type_id === deep.idLocal('@deep-foundation/core', 'Focus') && link._applies.includes('space')) || (link?.to?.type_id === deep.idLocal('@deep-foundation/core', 'Focus') && link._applies.includes('space'));

    let _value = '';
    let _name = '';
    let _type = '';
    let _symbol = '';

    if (typeof link?.value?.value !== 'undefined') {
      let json;
      try { json = json5.stringify(link?.value.value); } catch (error) { }
      _value = (
        typeof (link?.value.value) === 'object' && json
          ? json : link?.value.value
      );
      if (typeof (_value) === 'string') _value = _value.split('\n')[0];
      if (_value.length > 20) _value = _value.slice(0, 11) + '...' + _value.slice(-9, _value.length);
    }
    if (link?.inByType?.[deep.idLocal('@deep-foundation/core', 'Contain')]?.[0]?.value?.value) {
      _name = `name:${link?.inByType?.[deep.idLocal('@deep-foundation/core', 'Contain')]?.[0]?.value?.value}`;
    }
    if (ml.byTo[link?.type_id]?.find(l => l.type_id === deep.idLocal('@deep-foundation/core', 'Contain'))?.value?.value) {
      _type = `type:${ml.byTo[link?.type_id]?.find(l => l.type_id === deep.idLocal('@deep-foundation/core', 'Contain'))?.value?.value}`;
    }
    if (ml.byTo[link?.type_id]?.find(l => l.type_id === deep.idLocal('@deep-foundation/core', 'Symbol'))?.value?.value) {
      _symbol = ml.byTo[link?.type_id]?.find(l => l.type_id === deep.idLocal('@deep-foundation/core', 'Symbol'))?.value?.value;
    }

    const has_focus = !!focus?.value?.value?.x;

    const graphNode = {
      "id": link.id,
      "from_id": link.from_id,
      "to_id": link.to_id,
      "type_id": link.type_id,
      "name": (_name ? `${_name}` : undefined),
      "type": (_type ? `${_type}` : undefined),
      // ...(has_focus ? {
      //   fx: focus.value.value.x,
      //   fy: focus.value.value.y,
      //   fz: focus.value.value.z,
      // } : {}),
    };
    graphData.nodes.push(graphNode);
  }

  const linkIds = links.map((link) => (link.id));
  const spaceTypes = links.filter((link) => (link.type_id === 1)).map((link) => link.id);
  const typedLinks = links.filter((link) => (spaceTypes.includes(link.type_id)));

  const typedEdges = typedLinks.map((l) => ({ id: md5(l.id) + "-" + md5(l.type_id), "source": l.id, "target": l.type_id, "type": "type" }));

  const edges = links.filter((l) =>
  ((l.to_id && l.from_id !== 0) &&
    (linkIds.includes(l.to_id) &&
      linkIds.includes(l.from_id)))).map((l) =>
        [{ id: md5(l.from_id) + "-" + md5(l.id), "source": l.from_id, "target": l.id, "type": "from" }, { id: md5(l.to_id) + "-" + md5(l.id), "source": l.id, "target": l.to_id, "type": "to" }]
      ).flat();


  edges.push(...typedEdges);

  graphData.edges = edges;
  return graphData;
}