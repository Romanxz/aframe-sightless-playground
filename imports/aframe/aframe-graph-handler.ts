// @ts-nocheck

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useDebounceCallback } from "@react-hook/debounce";
import md5 from 'md5';
import { Entity, Scene } from "aframe-react";
import { getColorFromId } from "./get-color-from-id";
import { useSpaceId } from "@deep-foundation/deepcase/imports/hooks";

async ({ deep, require }) => {
    localStorage.debug = localStorage.debug.replace('*:error,*:info,*:warn', '');
    const { Button, Flex, Stack } = require('@chakra-ui/react')
    const React = require('react');
    const {
      Scene,
      Entity,
    } = require('aframe-react');
    const { useSpaceId, useFocusMethods, useRefAutofill, useBreadcrumbs, useShowExtra, useTraveler } = require('@deep-foundation/deepcase');
    const { useMinilinksFilter } = require('@deep-foundation/deeplinks');
    const json5 = require('json5');
    const md5 = require('md5');
    const uuidv4 = require('uuid');
    const d3d = require('d3-force-3d');
    const debounce = require('@react-hook/debounce');
    const AFRAME = await deep.import("aframe");
    await deep.import("scaler");
    await deep.import("rotator");
    await deep.import("dragger");
    await deep.import("el-movement");
    await deep.import("aframe-extras");
  
  
    try {
      AFRAME.registerComponent('node-sound', {
        schema: {
          id: { type: 'number', default: 1 },
          wave: { type: 'string', default: 'sawtooth' },
          minFreq: { type: 'number', default: 200 },
          maxFreq: { type: 'number', default: 3000 },
          volume: { type: 'number', default: 0.5 },
          panningModel: { type: "string", default: 'HRTF' },
          distanceModel: { type: "string", default: 'inverse' },
          refDistance: { type: 'number', default: 1 },
          maxDistance: { type: 'number', default: 10000 },
          rolloffFactor: { type: 'number', default: 1 },
          coneInnerAngle: { type: 'number', default: 360 },
          coneOuterAngle: { type: 'number', default: 360 },
          coneOuterGain: { type: 'number', default: 1 },
          throttle: { type: 'number', default: 0 },
          timeout: { type: 'number', default: 1000 },
          attack: { type: "number", default: 3.0 },
          bufferSize: { type: 'number', default: 1024 },
          sampleRate: { type: 'number', default: 44100 }
        },
  
        init: function () {
          console.log("node sound init")
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const self = this;
          this.isSoundInitialized = false; // Flag to track if sound is initialized
  
          if (self.data.id) {
            // Set timeout before sound starts playing
            setTimeout(function () {
              const hash = function (id) {
                let hashValue = 0;
                const str = id.toString();
                for (let i = 0; i < str.length; i++) {
                  const char = str.charCodeAt(i);
                  hashValue = ((hashValue << 5) - hashValue) + char;
                  hashValue |= 0; // Convert to 32bit integer
                }
                return Math.abs(hashValue) % 1000000; // Ensure positive value and limit the range
              };
  
              // Map the hashed value to the desired frequency range
              const hashedValue = hash(self.data.id);
              const normalizedHash = hashedValue / 1000000; // Since we limited the hash range to 1,000,000
              const frequencyFloat = self.data.minFreq + normalizedHash * (self.data.maxFreq - self.data.minFreq);
  
              // Round and clamp the frequency
              const frequency = Math.floor(frequencyFloat);
              const clampedFrequency = Math.min(Math.max(frequency, self.data.minFreq), self.data.maxFreq);
  
              // Set the oscillator options
              const oscOptions = {
                type: self.data.wave,
                frequency: clampedFrequency,
                bufferSize: self.data.bufferSize,
                sampleRate: self.data.sampleRate
              };
              // console.log({ oscOptions });
              self.oscillator = self.audioContext.createOscillator();
  
              self.oscillator.type = oscOptions.type;
              self.oscillator.frequency.setValueAtTime(clampedFrequency, self.audioContext.currentTime);
  
              // Check if volume is finite, set to 0 if it's not
              if (!isFinite(self.data.volume)) {
                self.data.volume = 0;
              }
  
              self.panner = self.audioContext.createPanner();
              self.panner.panningModel = self.data.panningModel;
              self.panner.distanceModel = self.data.distanceModel;
              self.panner.refDistance = self.data.refDistance;
              self.panner.maxDistance = self.data.maxDistance;
              self.panner.rolloffFactor = self.data.rolloffFactor;
              self.panner.coneInnerAngle = self.data.coneInnerAngle;
              self.panner.coneOuterAngle = self.data.coneOuterAngle;
              self.panner.coneOuterGain = self.data.coneOuterGain;
  
              // Create a gain node and ramp up the volume gradually
              self.gainNode = self.audioContext.createGain();
              self.gainNode.gain.setValueAtTime(0.0000001, self.audioContext.currentTime); // set to very low value to avoid clicks
              self.gainNode.gain.exponentialRampToValueAtTime(self.data.volume, self.audioContext.currentTime + self.data.attack); // 3 second attack time
  
              self.oscillator.connect(self.gainNode); // Connect to gain node instead of Panner
              self.gainNode.connect(self.panner); // Then connect to Panner
              self.panner.connect(self.audioContext.destination);
  
              self.oscillator.start();
              // console.log("oscillator started")
  
              self.camera = document.getElementById('camera');
              self.isSoundInitialized = true; // Flag that sound is initialized
  
              if (self.data.throttle > 0) {
                self.tick = AFRAME.utils.throttleTick(self.tick, self.data.throttle, self);
              }
            }, self.data.timeout); // Timeout value from component schema
          }
  
        },
  
        tick: function () {
          if (!this.isSoundInitialized) return; // Return if sound is not initialized
  
          const { x, y, z } = this.el.getAttribute('position');
  
          if (!this.lastPosition ||
            (x !== this.lastPosition.x || y !== this.lastPosition.y || z !== this.lastPosition.z)) {
            this.panner.setPosition(x, y, z);
            this.lastPosition = { x, y, z };
          }
  
          if (this.camera && this.camera.object3D) {
            const { x: cameraX, y: cameraY, z: cameraZ } = this.camera.getAttribute('position');
            const cameraPosition = { x: cameraX, y: cameraY, z: cameraZ };
  
            if (!this.lastCameraPosition ||
              (cameraX !== this.lastCameraPosition.x || cameraY !== this.lastCameraPosition.y || cameraZ !== this.lastCameraPosition.z)) {
              this.audioContext.listener.setPosition(cameraX, cameraY, cameraZ);
              this.lastCameraPosition = cameraPosition;
            }
  
            const { x: rotationX, y: rotationY, z: rotationZ } = this.camera.getAttribute('rotation');
            const rotation = { x: rotationX, y: rotationY, z: rotationZ };
  
            if (!this.lastRotation ||
              (rotationX !== this.lastRotation.x || rotationY !== this.lastRotation.y || rotationZ !== this.lastRotation.z)) {
              const forwardVector = new THREE.Vector3().setFromEuler(new THREE.Euler(-this.degToRad(rotation.x), -this.degToRad(rotation.y), -this.degToRad(rotation.z), "YXZ"));
              const upVector = new THREE.Vector3(0, 1, 0);
              if (this.camera.object3D.quaternion) {
                upVector.applyQuaternion(this.camera.object3D.quaternion);
                this.audioContext.listener.setOrientation(forwardVector.x, forwardVector.y, forwardVector.z, upVector.x, upVector.y, upVector.z);
              }
              this.lastRotation = rotation;
            }
          }
        },
  
        degToRad: function (degrees) {
          return degrees * Math.PI / 180;
        },
  
        remove: function () {
          if (!this.isSoundInitialized) return;
          this.oscillator.stop();
        }
      });
    } catch { };

    //   node-sound={{
      //     id: 666,
      //     wave: "sine",
      //     // wave: "sawtooth",
      //     sampleRate: 44100,
      //     bufferSize: 16384,
      //     minFreq: 200,
      //     maxFreq: 10000,
      //     volume: 0.8,
      //     panningModel: 'HRTF',
      //     distanceModel: 'inverse',
      // refDistance: 0.1,
      // maxDistance: 500,
      // rolloffFactor: 3,
      //     coneInnerAngle: 360,
      //     coneOuterAngle: 360,
      //     coneOuterGain: 0,
      //     timeout: 1000,
      //     attack: 2.0,
      //     throttle: 0
      //   }}
  
    function stopAllSounds() {
      const nodes = document.querySelectorAll('.deepgraph-node');
      nodes.forEach(node => {
        if (node.components.sound) {
          node.components.sound.stopSound();
        }
      });
    }
  
    try {
      AFRAME.registerComponent('left-thumbstick-movement', {
        schema: {
          speed: { type: 'number', default: 0.1 }
        },
  
        init: function () {
          const leftController = document.querySelector('[left-controls]');
          this.camera = document.querySelector('[camera]');
  
          // Attach event listener to left thumbstick
          leftController.addEventListener('thumbstickmoved', this.moveCamera.bind(this));
        },
  
        moveCamera: function (event) {
          const thumbstick = event.detail.axis;
          const pos = this.camera.getAttribute('position');
          const rotation = this.camera.getAttribute('rotation');
          const direction = new THREE.Vector3();
  
          // Calculate movement based on thumbstick position
          const angle = THREE.Math.degToRad(rotation.y);
          const x = thumbstick[0];
          const y = thumbstick[1];
  
          direction.z = -Math.cos(angle) * y - Math.sin(angle) * x;
          direction.x = Math.sin(angle) * y - Math.cos(angle) * x;
          direction.y = -thumbstick[2];
  
          // Update camera position
          pos.add(direction.multiplyScalar(this.data.speed));
          this.camera.setAttribute('position', pos);
        }
      });
    } catch { };
  
    const getColorFromId = (id) => {
      let hash = md5(id);
      let r = parseInt(hash.substr(0, 2), 16) % 128 + 128;
      let g = (parseInt(hash.substr(2, 2), 16) % 128) + 64;
      let b = parseInt(hash.substr(4, 2), 16) % 128 + 128;
      return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    }
  
    return ({ style, link }) => {
      const [isVr, setVr] = React.useState(false);
      const [traveler, setTraveler] = useTraveler();
      const [extra, setExtra] = useShowExtra();
      const [breadcrumbs, setBreadcrumbs] = useBreadcrumbs();
      const travelerRef = useRefAutofill(traveler);
      const [spaceId, setSpaceId] = useSpaceId();
  
      const TravelerRef = React.useRef(0);
      const [simulation, setSimulation] = React.useState();
      const [isSceneStarted, setSceneStatus] = React.useState(false);
      const oldNodes = React.useRef([]);
      const oldEdges = React.useRef([]);
  
      React.useEffect(() => {
        (async () => {
          TravelerRef.current = await deep.id('@deep-foundation/deepcase', 'Traveler');
        })();
      }, []);
  
      const links = useMinilinksFilter(
        deep.minilinks,
        React.useCallback((l) => true, []),
        React.useCallback((l, ml) => {
          const Traveler = TravelerRef.current;
          const traveler = travelerRef.current;
          let result = (
            extra
              ? ml.links
              : ml.links.filter(l => (
                !!l._applies.find((a) => !!~a.indexOf('query-') || a === 'space' || a === 'breadcrumbs' || a === 'not-loaded-ends')
              ))
          )
          if (Traveler && !traveler) {
            result = result.filter(l => (
              !(l.type_id === Traveler) // Traveler
              &&
              !(l.type_id === deep.idLocal('@deep-foundation/core', 'Contain') && l?.to?.type_id === Traveler) // Traveler Contain
              &&
              !(l.inByType?.[Traveler]?.length) // Traveler Query
              &&
              !(l.type_id === deep.idLocal('@deep-foundation/core', 'Contain') && l?.to?.inByType?.[Traveler]?.length) // Traveler Query Contain
              &&
              !(l.type_id === deep.idLocal('@deep-foundation/core', 'Active') && l?.to?.inByType?.[Traveler]?.length) // Traveler Query Active
              &&
              !(l.type_id === deep.idLocal('@deep-foundation/core', 'Contain') && l?.to?.type_id === deep.idLocal('@deep-foundation/core', 'Active') && l?.to?.to?.inByType?.[Traveler]?.length) // Traveler Query Active Contain
            ));
          }
          return result;
        }, [extra, breadcrumbs, traveler]),
        1000,
      ) || [];
      // console.log({ links });
  
      const updateSimulationDebounced = debounce.useDebounceCallback(() => {
        !!graphData.nodes.length && !!graphData.edges.length && updateSimulation(simRef.current, graphData, oldNodes, oldEdges);
        console.log("Simulation updated: ", simRef.current);
      }, 1000);
  
      const graphData = React.useMemo(() => {
        const graphData = getGraphData(deep, links, spaceId);
        console.log("graphData created: ", graphData);
        return graphData;
      }, [links])
  
      const simRef = React.useRef();
      React.useEffect(() => {
        
          simRef.current = initializeSimulation({ nodes: [{ id: 0, type_id: 0 }], edges: [] }, oldNodes, oldEdges);
          console.log("Simulation created: ", simRef.current);
        
        return () => {
          simRef?.current?.stop();
          stopAllSounds();
        };
      }, []);
  
      React.useEffect(() => {
          updateSimulationDebounced();
      }, [graphData]);
  
      const { initializeNodeHover } = useNodeHover();
      const { initializeNodeDrag } = useNodeDragger();
      // const { initializeNodeSound, nodeSoundTick } = useNodeSound({
      //   wave: "sine",
      //   minFreq: 200,
      //   maxFreq: 5000,
      //   volume: 0.1,
      //   panningModel: 'HRTF',
      //   distanceModel: 'inverse',
      //   refDistance: 0.01,
      //   maxDistance: 2000,
      //   rolloffFactor: 0.1,
      //   coneInnerAngle: 360,
      //   coneOuterAngle: 360,
      //   coneOuterGain: 1,
      //   throttle: 68,
      // });
  
      return (<div style={{ height: 700, width: 500, ...style }}>
        <Scene
          id="scene"
          // stats
          events={{
            // "enter-vr": () => { setVr(true); console.log("entered VR"); },
            // "exit-vr": () => setVr(false),
            // loaded: () => simulation.restart(),
          }}
          // use-engine-tick={{
          //   onEngineTick: () => { },
          //   throttle: 68
          // }}
          renderer="logarithmicDepthBuffer: true" embedded>
          <Entity id="deepgraph" className="deepgraph" scaler dragger rotator >
            {graphData?.nodes?.map((node) =>
              <Entity
                className="deepgraph-node"
                id={md5(node.id)}
                key={md5(node.id)}
                events={{ loaded: () => { initializeNodeHover(node); } }}
                sound={{ src: "/node.mp3", on: "raycaster-intersected", volume: 0.6 }}
                geometry={{ primitive: "sphere", radius: 0.1, segmentsWidth: 16, segmentsHeight: 9 }}
                material={{
                  shader: "standard",
                  color: getColorFromId(node.type_id),
                  // opacity: 0.3,
                }}
              node-sound={{
                id: node.type_id,
                wave: ['sine', 'square', 'sawtooth', 'triangle'][node.type_id % 4],
                sampleRate: 44100,
                bufferSize: 16384,
                minFreq: 200,
                maxFreq: 15000,
                volume: 0.3,
                panningModel: 'HRTF',
                distanceModel: 'inverse',
                refDistance: 1,
                maxDistance: 3000,
                rolloffFactor: 1,
                coneInnerAngle: 360,
                coneOuterAngle: 360,
                coneOuterGain: 1,
                timeout: 1000,
                attack: 2.0,
                throttle: 68
              }}
              >
                {
                  // <Entity>
                  //   <Entity
                  //     text={{
                  //       value: node.type,
                  //       color: getColorFromId(node.type_id),
                  //       width: 2,
                  //       font: "roboto",
                  //       align: "center",
                  //       side: "double"
                  //     }}
                  //     position={{ x: 0, y: 0.3, z: 0 }}
                  //   />
                  //   <Entity
                  //     text={{
                  //       value: node.name,
                  //       color: getColorFromId(node.type_id),
                  //       width: 2,
                  //       font: "roboto",
                  //       align: "center",
                  //       side: "double"
                  //     }}
                  //     position={{ x: 0, y: 0.4, z: 0 }}
                  //   />
                  //   <Entity
                  //     text={{
                  //       value: node.id.toString(),
                  //       color: getColorFromId(node.type_id),
                  //       width: 3,
                  //       font: "roboto",
                  //       align: "center",
                  //       side: "double"
                  //     }}
                  //     position={{ x: 0, y: 0.5, z: 0 }}
                  //   />
                  // </Entity>
                }
              </Entity>
            )}
            {graphData.edges.map((edge) =>
              <Entity
                id={edge.id}
                key={md5(edge.id)}
                geometry={{ primitive: "cylinder", radius: 0.005, segmentsHeight: 3, openEnded: true, height: 1 }}
                material={{
                  shader: "standard",
                  color: getColorFromId(edge.type),
                }}
              />
            )}
          </Entity>
          <Entity id="cameraRig"
            movement-controls={{
              camera: "#camera",
              controls: "gamepad, nipple"
            }}
            nipple-controls="mode: static; lookJoystickEnabled: false; moveJoystickPosition: right"
            navigator={{ cameraRig: '#camera', cameraHead: '#camera' }}
            position={{ x: 0, y: 0, z: 0 }} rotaton={{ x: 0, y: 0, z: 0 }}
          >
            <Entity id="camera"
              camera={{ active: true, fov: 120 }}
              look-controls={{ pointerLockEnabled: false }}
              wasd-controls={{ enabled: true, fly: true }}
              position={{ x: 0, y: 1.6, z: 0 }}
            />
            <Entity id="left"
              hand-tracking-controls={{ hand: 'left' }}
              laser-controls={{ hand: 'left' }}
              visible={true}
            />
            <Entity id="right"
              hand-tracking-controls={{ hand: 'right' }}
              raycaster="show-line:true; lineColor: steelblue; lineOpacity: 0.85; objects: .deepgraph-node;"
              laser-controls={{ hand: 'right' }}
              visible={true}
            />
          </Entity>
          <Entity
            id="cursor"
            cursor={{ rayOrigin: "mouse" }}
            raycaster="show-line:true; lineColor: steelblue; lineOpacity: 0.85; objects: .deepgraph-node;"
          />
        </Scene>
      </div>)
    }
  
    function initializeSimulation(graphData, oldNodes, oldEdges) {
      // Identify new nodes
      const newForceNodes = graphData.nodes.filter(newNode =>
        !oldNodes.current.some(oldNode => oldNode.id === newNode.id)
      );
  
      // Identify new edges
      const newForceEdges = graphData.edges.filter(newEdge =>
        !oldEdges.current.some(oldEdge => oldEdge.id === newEdge.id)
      );
  
      // Merge old force nodes with new force nodes
      const mergedForceNodes = [...oldNodes.current, ...newForceNodes];
  
      // Merge old force edges with new force edges
      const mergedForceEdges = [...oldEdges.current, ...newForceEdges];
  
      // Initialize the simulation with merged data
      let simulation = d3d.forceSimulation(mergedForceNodes, 3)
        .alphaMin(0.001)
        .alphaDecay(0.1)
        .velocityDecay(0.4)
        .alphaTarget(0.001)
        .stop();
  
      const radius = 0.1;
  
      // Initialize forces
      let _collide = d3d.forceCollide((radius / radius) * 0.5);
      let _link = d3d.forceLink(mergedForceEdges)
        .id((n) => n.id)
        .distance(radius * radius)
        .strength(radius / radius);
      let _manyBody = d3d.forceManyBody().strength(-((radius / radius) * 0.25));
      let _center = d3d.forceCenter();
  
      // Add forces to the simulation
      simulation
        .force('collide', _collide)
        .force('link', _link)
        .force('charge', _manyBody)
        .force('center', _center)
  
      // Update oldNodes.current and oldEdges for future comparisons
      oldNodes.current = mergedForceNodes;
      oldEdges.current = mergedForceEdges;
  
      return simulation;
    }
  
    function updateSimulation(simulation, graphData, oldNodes, oldEdges) {
      // Identify new nodes
      const newNodes = graphData.nodes.filter(newNode =>
        !oldNodes.current.some(oldNode => oldNode.id === newNode.id)
      );
  
      // Identify new edges
      const newEdges = graphData.edges.filter(newEdge =>
        !oldEdges.current.some(oldEdge => oldEdge.id === newEdge.id)
      );
  
      // Check if newNodes and newEdges are same as oldNodes and oldEdges
      if (newNodes.length === 0 && newEdges.length === 0) return;
  
      // Merge old nodes with new nodes
      const mergedNodes = [...oldNodes.current, ...newNodes];
  
      // Merge old edges with new edges
      const mergedEdges = [...oldEdges.current, ...newEdges];
  
      // Update the simulation
      simulation.nodes(mergedNodes);
      simulation.force('link').links(mergedEdges);
  
      function tick() {
        // console.log(1)
        let scene = document.querySelector('a-scene');
        if (scene?.hasLoaded) {
          for (const node of mergedNodes) {
            const nodeEl = document.getElementById(`${md5(node.id)}`);
            if (nodeEl?.object3D) {
              const nodeElPos = nodeEl.getAttribute("position");
              if (nodeEl.is("Hovered") && !nodeEl.is("Dragged")) {
                // console.log("DraggedNode: ", node)
                Object.assign(node, {
                  fx: node.x,
                  fy: node.y,
                  fz: node.z,
                });
              } else {
                Object.assign(node, {
                  fx: undefined,
                  fy: undefined,
                  fz: undefined,
                });
              }
              if (nodeEl.is("Dragged") && !nodeEl.is("Hovered")) {
                console.log("DraggedNode: ", node)
                Object.assign(node, {
                  fx: undefined,
                  fy: undefined,
                  fz: undefined,
                  x: node.dx,
                  y: node.dy,
                  z: node.dz,
                });
              } else {
                Object.assign(node, {
                  fx: undefined,
                  fy: undefined,
                  fz: undefined,
                });
              }
              if (!nodeEl.is("Dragged")) {
                nodeEl.setAttribute('position', { x: node.x, y: node.y, z: node.z });
              }
            }
          }
          for (const edge of mergedEdges) {
            const edgeEl = document.getElementById(`${edge.id}`);
            const sourceEl = document.getElementById(`${md5(edge.source.id)}`);
            const targetEl = document.getElementById(`${md5(edge.target.id)}`);
            if (edgeEl?.object3D && sourceEl?.object3D && targetEl?.object3D) {
              const spos = sourceEl.object3D.position;
              const tpos = targetEl.object3D.position;
  
              const midpoint = new THREE.Vector3().addVectors(spos, tpos).multiplyScalar(0.5);
  
              const height = spos.distanceTo(tpos);
  
              let orientation = new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 1, 0),
                new THREE.Vector3().subVectors(tpos, spos).normalize()
              );
  
              edgeEl.object3D.position.set(midpoint.x, midpoint.y, midpoint.z);
              edgeEl.object3D.setRotationFromQuaternion(orientation);
              edgeEl.setAttribute('geometry', { height });
            }
          }
        }
      }
  
      simulation.on('tick', tick);
  
      // Update oldNodes and oldEdges for future comparisons
      oldNodes.current = mergedNodes;
      oldEdges.current = mergedEdges;
  
      // Uncomment the following line if you want to "reheat" the simulation
      simulation.restart().alpha(1)
    }
  
    function useNodeHover() {
      const elRef = React.useRef();
      const raycaster = React.useRef()
  
      const refRaycasterIntersected = React.useRef();
      const refRaycasterIntersectedCleared = React.useRef();
  
      const initializeNodeHover = (node) => {
        let el;
        setTimeout(() => {
          elRef.current = el = document.getElementById(`${md5(node.id)}`);
          if (el?.hasLoaded) {
            refRaycasterIntersected.current = function (evt) {
              raycaster.current = evt.detail.el.components.raycaster;
              const intersection = raycaster.current.getIntersection(el);
              el.addState("Hovered");
              const elPos = el.getAttribute("position");
              // el.setAttribute("position", {
              //   x:elPos.x + 10,
              //   y:elPos.y + 10,
              //   z:elPos.z + 10,
              // });
              // console.log(`${node.id}`, "Im intersected!", { intersection });
            };
            el.addEventListener('raycaster-intersected', refRaycasterIntersected.current);
  
            refRaycasterIntersectedCleared.current = function (evt) {
              raycaster.current = undefined;
              el.removeState("Hovered");
              // console.log('Intersection cleared: ', evt.detail);
            };
            el.addEventListener('raycaster-intersected-cleared', refRaycasterIntersectedCleared.current);
          }
        }, 1000);
        console.log("Node Hover Loaded");
      };
  
      React.useEffect(() => {
        return () => {
          const el = elRef.current;
          if (el) {
            el.removeEventListener('raycaster-intersected', refRaycasterIntersected.current);
            el.removeEventListener('raycaster-intersected-cleared', refRaycasterIntersectedCleared.current);
          }
        };
      }, []);
  
      return { initializeNodeHover };
    }
  
    function useNodeDragger() {
      const elRef = React.useRef();
      const nodeEl = React.useRef();
      const isDrag = React.useRef();
      const startPos = React.useRef();
      const newNodePos = React.useRef();
      const controllerPos = React.useRef();
      const { focus, unfocus } = useFocusMethods();
  
      const refRaycasterIntersection = React.useRef();
      const refRaycasterIntersectionCleared = React.useRef();
      const refTriggerdown = React.useRef();
      const refTriggerup = React.useRef();
      const refElMoved = React.useRef();
  
      const initializeNodeDrag = (graphData) => {
        let el;
        setTimeout(() => {
          elRef.current = el = document.getElementById("right");
          if (el?.hasLoaded) {
            refRaycasterIntersection.current = function (evt) {
              console.log(evt.detail);
              const intersection = el.components.raycaster.getIntersection(evt.detail.els[0]);
              console.log({ intersection });
              nodeEl.current = intersection.object.el;
              const nodeId = nodeEl.current.id;
              console.log(nodeId)
              console.log('Intersected!');
              console.log("nodeEl", { nodeEl });
            };
            el.addEventListener('raycaster-intersection', refRaycasterIntersection.current);
  
            refRaycasterIntersectionCleared.current = function (evt) {
              if (!isDrag.current) {
                nodeEl.current = undefined;
                console.log('Intersection cleared: ', evt.detail);
              }
            };
            el.addEventListener('raycaster-intersection-cleared', refRaycasterIntersectionCleared.current);
  
            refTriggerdown.current = function (evt) {
              console.log("triggerdown");
              if (!nodeEl.current) return;
              isDrag.current = true;
              nodeEl.current.addState("Dragged");
              startPos.current = { ...el.getAttribute("position") }
              console.log('controllerStartPos: ', startPos.current);
            };
            el.addEventListener('triggerdown', refTriggerdown.current);
  
            refElMoved.current = function (evt) {
              if (nodeEl.current && isDrag.current && startPos.current && !nodeEl.current.is("Hovered")) {
                const nodeId = nodeEl.current.id;
                const draggedNodeIndex = graphData.nodes.findIndex((node) => md5(node.id) === nodeId);
                console.log(evt);
                console.log("ControllerStartPos: ", startPos.current);
                controllerPos.current = evt.detail.position;
                console.log("ControllerCurrentPos: ", controllerPos.current);
                const nodeElPos = nodeEl.current.object3D.position;
                console.log("nodeEl: ", nodeEl.current);
                const deltaX = startPos.current.x - controllerPos.current.x;
                const deltaY = startPos.current.y - controllerPos.current.y;
                const deltaZ = startPos.current.z - controllerPos.current.z;
                const ray = el.components.raycaster.ray;
                const planeNormal = ray.direction;
                const planePoint = nodeEl.current.object3D.position;
                const intersectionPoint = new THREE.Vector3();
  
                if (ray.intersectPlane(planeNormal, planePoint, intersectionPoint)) {
                  // nodeEl.current.object3D.position.copy(intersectionPoint);
                  Object.assign(graphData.nodes[draggedNodeIndex], {
                    dx: intersectionPoint.x,
                    dy: intersectionPoint.y,
                    dz: intersectionPoint.z
                  })
                }
                // newNodePos.current = {
                //   x: (nodeElPos.x - deltaX),
                //   y: (nodeElPos.y - deltaY),
                //   z: (nodeElPos.z - deltaZ),
                // }
                // Object.assign(graphData.nodes[draggedNodeIndex], {
                //   dx: newNodePos.current.x,
                //   dy: newNodePos.current.y,
                //   dz: newNodePos.current.z
                // })
                // nodeEl.current.setAttribute('position', newNodePos.current);
                // console.log("newNodePos: ", newNodePos.current);
                // console.log("newNodeElPos: ", nodeElPos);
                // console.log("newNodeDelta: ", deltaX, deltaY, deltaZ);
                // console.log("newNodeElPos: ", nodeElPos);
              }
            }
            el.addEventListener('el-moved', refElMoved.current);
  
            refTriggerup.current = function (evt) {
              console.log('triggerup');
              if (nodeEl.current && isDrag.current && newNodePos.current) {
                // @ts-ignore
                // focus(nodeEl.current.id, newNodePos.current);
                console.log('focus:', nodeEl.current);
              }
              isDrag.current = false;
              nodeEl.current.removeState("Dragged");
              console.log('triggerup');
            };
            el.addEventListener('triggerup', refTriggerup.current);
          }
        }, 1000);
        console.log("Node Dragger Loaded");
      };
  
      React.useEffect(() => {
        return () => {
          const el = elRef.current;
          if (el) {
            el.removeEventListener('raycaster-intersection', refRaycasterIntersection.current);
            el.removeEventListener('raycaster-intersection-cleared', refRaycasterIntersectionCleared.current);
            el.removeEventListener('triggerdown', refTriggerdown.current);
            el.removeEventListener('triggerup', refTriggerup.current);
            el.removeEventListener('el-moved', refElMoved.current);
          }
        };
      }, []);
  
      return { initializeNodeDrag };
    }
  
    function useNodeSound(options) {
      const elRef = React.useRef();
      const audioContextRef = React.useRef(new (window.AudioContext || window.webkitAudioContext)());
      const oscillatorRef = React.useRef();
      const pannerRef = React.useRef();
      const cameraRef = React.useRef(document.getElementById('camera'));
  
      const degToRad = (degrees) => {
        return degrees * Math.PI / 180;
      };
  
      const hash = (id) => {
        let hashValue = 0;
        const str = id.toString();
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hashValue = ((hashValue << 5) - hashValue) + char;
          hashValue |= 0; // Convert to 32bit integer
        }
        return Math.abs(hashValue) % 1000000; // Ensure positive value and limit the range
      };
  
      const initializeNodeSound = (node) => {
        let el;
        setTimeout(() => {
          elRef.current = el = document.getElementById(`${md5(node.id)}`);
          if (el?.hasLoaded) {
            // Node-sound initialization logic
            const hashedValue = hash(node.id);
            const normalizedHash = hashedValue / 1000000;
            const frequencyFloat = options.minFreq + normalizedHash * (options.maxFreq - options.minFreq);
            const frequency = Math.round(frequencyFloat);
            const clampedFrequency = Math.min(Math.max(frequency, options.minFreq), options.maxFreq);
  
            oscillatorRef.current = audioContextRef.current.createOscillator();
            oscillatorRef.current.type = options.wave;
            oscillatorRef.current.frequency.setValueAtTime(clampedFrequency, audioContextRef.current.currentTime);
  
            pannerRef.current = audioContextRef.current.createPanner();
            pannerRef.current.panningModel = options.panningModel;
            pannerRef.current.distanceModel = options.distanceModel;
            pannerRef.current.refDistance = options.refDistance;
            pannerRef.current.maxDistance = options.maxDistance;
            pannerRef.current.rolloffFactor = options.rolloffFactor;
            pannerRef.current.coneInnerAngle = options.coneInnerAngle;
            pannerRef.current.coneOuterAngle = options.coneOuterAngle;
            pannerRef.current.coneOuterGain = options.coneOuterGain;
  
            oscillatorRef.current.connect(pannerRef.current);
            pannerRef.current.connect(audioContextRef.current.destination);
            cameraRef.current = document.getElementById("camera");
            oscillatorRef.current.start();
          }
        }, 1000);
        console.log("Node Sound Loaded");
      };
  
      const nodeSoundTick = () => {
        if (!elRef.current || !cameraRef.current || !pannerRef.current) return;
        const position = elRef.current.getAttribute('position');
        pannerRef.current.setPosition(position.x, position.y, position.z);
  
        const cameraPosition = cameraRef.current.getAttribute('position');
        audioContextRef.current.listener.setPosition(cameraPosition.x, cameraPosition.y, cameraPosition.z);
  
        const rotation = cameraRef.current.getAttribute('rotation');
        const forwardVector = {
          x: -Math.sin(degToRad(rotation.y)) * Math.cos(degToRad(rotation.x)),
          y: Math.sin(degToRad(rotation.x)),
          z: -Math.cos(degToRad(rotation.y)) * Math.cos(degToRad(rotation.x))
        };
        const upVector = { x: 0, y: 1, z: 0 };
        audioContextRef.current.listener.setOrientation(forwardVector.x, forwardVector.y, forwardVector.z, upVector.x, upVector.y, upVector.z);
      };
  
      // React.useEffect(() => {
      //   tick();
      // }, [elRef.current, cameraRef.current]);
  
      React.useEffect(() => {
        return () => {
          oscillatorRef.current?.stop();
        };
      }, []);
  
      return { initializeNodeSound, nodeSoundTick };
    }
  
    function getGraphData(deep, links, spaceId) {
  
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
  }
  
  