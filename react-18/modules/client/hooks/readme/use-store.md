# use-store

Returns the supplied on/off-capable store and triggers React renders on requested events. Events must be an array; stable identity avoids rebinding on every render. React 18 supports optional onListen, but its identity is omitted from effect dependencies.

See the repository-local [hooks contract](../../../../../docs/hooks.md) for exact version differences, source links and integration requirements.
