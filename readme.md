[![Gitpod](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/Romanxz/aframe-sightless-playground) 
[![Static Badge](https://img.shields.io/badge/Sightless%20Playground-lightblue?style=flat%20&logo=github&label=GH-pages&labelColor=darkviolet&link=https%3A%2F%2Fromanxz.github.io%2Faframe-sightless-playground%2F)](https://romanxz.github.io/aframe-sightless-playground/)


# A-Frame 3D WebXR Sightless Playground

## Introduction 

Welcome to **A-Frame 3D WebXR Sightless Playground**, an immersive environment where you can manipulate 3D geometrical elements with positional audio attached to it for a truly unique and interactive sightless virtual reality experience.

## Environment

Current setup includes a virtual area with various scenes. Each scene consists of block-diagrams created with geometry primitives such as sphere, box and cylinder, sometimes connected with directional edges. 

## Using lecture player

- Click "Run" button at the center of the screen to start the lecture. 
- Click AR/VR button at the right bottom corner of the screen to start webVR experience.

While the lecture is playing, scenes will change automatically related to certain timecodes. 
You can cycle through scenes in a carousel-like manner by turning your right thumbstick left or right. 
When scene is switched, lecture audio will also jump to the related timecode.

There is 3 audio layers in each scene. Toggle "Run" button at the center of the screen to start the lecture.

- First - part of the lecture, related to the current scene and handled by simple audio player with no spatialness. Use left controller's Y button to pause the lecture, X button to resume.
- Second - spatial ping sounds representing the location of each object in the block-diagram. Play/pause controls are the same but with left trigger modifier. LT + Y to pause, LT + X to resume.
- Third - each geometry node has its uniqie vioceover which describes the meaning of the node. This voiceover plays as spatial audio when its geometry node is targeted by controller's raycaster.

## Space Navigation and Manipulation

- You can interact with the virtual environment using the controller. 

- If you press down the left grip button, you can drag the entire scene relative to the left controller's position changes. 

- Once you release the grip, the scene will stay at the last known position.

Finally, you can navigate the virtual environment in a typical fashion using the left thumbstick. Move it in any direction to smoothly traverse through the scene.

## Object Interaction

- Using the controller's raycaster function, you can manipulate individual geometric objects within the scene. 

- Point the ray from your controller toward a geometry object, then press the trigger. This will snap the object to the intersection point on the controller's ray, allowing you to move and rotate the geometric object in space, tied to your controller movements. 

- The object behaves as if it is attached to a sphere of radius equal to the initial distance between the controller and the object(starting distance).

- By moving your thumbstick up and down on the y-axis, you can change this distance, moving objects closer (to a minimum of 0.3 aframe meters) or further away.

- You also have the option to quickly snap an object to the closest possible distance by pressing the grip while dragging the object. This will instantly reduce the `distanceToTarget` value to the minimum of 0.3.

## Haptic Feedback

Haptic Feedback provides physical sensations to communicate information to the user, adding a new dimension of interactivity and immersion. In our 3D playground, haptic vibrations are triggered for various controller actions:

- When raycasting existing objects with .draggable css class.
- When creating new objects.
- During the process of geometry selection.
- While interacting with objects in the scene (dragging, rotating, etc).
- When snapping an object to a closer distance.

We hope that you enjoy interacting with our **A-Frame 3D WebXR Playground** and look forward to any feedback or suggestions. Happy virtual exploring!
