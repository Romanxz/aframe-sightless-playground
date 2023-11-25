import React, { useEffect, useState, useRef } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Entity, Scene } from "aframe-react";

export default function SceneSwitcher(props) {
  const [currentScene, setCurrentScene] = useState(0);

  const scenes = props.children;
  console.log(scenes)

  const isTriggerDown = useRef(false);
  const isThumbstickReleased = useRef(true);

  const nextScene = () => setCurrentScene((currentScene + 1) % scenes.length);
  const prevScene = () => setCurrentScene((currentScene - 1 + scenes.length) % scenes.length);

  useEffect(() => {
    const rightController = document.getElementById('right');

    if (!rightController) return;

    rightController.addEventListener('triggerdown', () => { isTriggerDown.current = true; });
    rightController.addEventListener('triggerup', () => { isTriggerDown.current = false; });

    function onThumbStickMoved(evt) {
      if (!isTriggerDown.current) {
        const direction = evt.detail.x;
        if (direction < -0.4) {
          if (isThumbstickReleased.current) {
            prevScene();
            isThumbstickReleased.current = false;
          }
        } else if (direction > 0.4) {
          if (isThumbstickReleased.current) {
            nextScene();
            isThumbstickReleased.current = false;
          }
        } else {
          isThumbstickReleased.current = true;
        }
      }
    }

    rightController.addEventListener('thumbstickmoved', onThumbStickMoved);

    return () => {
      rightController.removeEventListener('triggerdown', () => { isTriggerDown.current = true; });
      rightController.removeEventListener('triggerup', () => { isTriggerDown.current = false; });
      rightController.removeEventListener('thumbstickmoved', onThumbStickMoved);
    };
  }, [nextScene, prevScene]);

  return scenes[currentScene];
};
