import React from 'react';
import { DeepProvider, useDeep } from '@deep-foundation/deeplinks/imports/client';
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Text,
  Link,
  Stack,
  Card,
  CardBody,
  Heading,
  CardHeader,
} from '@chakra-ui/react';
import {
  DeepClient,
} from '@deep-foundation/deeplinks/imports/client';
import { useRefAutofill, useBreadcrumbs, useShowExtra, useTraveler } from '@deep-foundation/deepcase/imports/hooks';
import { useMinilinksFilter } from '@deep-foundation/deeplinks/imports/minilinks';
import { AframeGraph } from "../imports/aframe/aframe-graph";

function Content() {
  const deep = useDeep();

  useEffect(() => {
    new Promise(async () => {
      if (deep.linkId !== 0) {
        return;
      }
      await deep.guest();
    });
  }, [deep]);

  // useEffect(() => {
  //   (async () => {
  //     if (typeof (window) !== undefined) {
  //       localStorage.logs = 0;
  //       const AFRAME = await import('aframe');
  //       if (localStorage?.debug?.length > 0) {
  //         localStorage.debug = localStorage.debug.replace('*:error,*:info,*:warn', '');
  //       }
  //     }
  //   })();
  // }, []);

  const [traveler, setTraveler] = useTraveler();
  const [extra, setExtra] = useShowExtra(); 2
  const [breadcrumbs, setBreadcrumbs] = useBreadcrumbs();
  const travelerRef = useRefAutofill(traveler);

  const TravelerRef = useRef(0);

  useEffect(() => {
    (async () => {
      TravelerRef.current = await deep.id('@deep-foundation/deepcase', 'Traveler');
    })();
  }, []);

  const links = useMinilinksFilter(
    deep.minilinks,
    useCallback((l) => true, []),
    useCallback((l, ml) => {
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
  console.log({ links });

  return (
      <>
        <AframeGraph deep={deep} links={links} />
      </>
  );
}

export default function Page() {
  return (
          <Content />
  );
}