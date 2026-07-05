import { HexclaveHandler } from '@hexclave/next';
import { stackServerApp } from '@/lib/stack';

export default function Handler(props: any) {
  return <HexclaveHandler fullPage app={stackServerApp} routeProps={props} />;
}
