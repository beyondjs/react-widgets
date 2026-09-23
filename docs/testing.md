# Testing

This repository has no tests: no test files, fixtures, runner or command. The React 19 framework controllers are exercised from another repository: the command line's `web` acceptance in the `cli` repository (an optional external reference) mounts a React 19 widget in a real browser with Tailwind and a transitive stylesheet, code and stylesheet updates, boundaries and server rendering followed by hydration. React 17 and 18 are exercised by no validation. [Build and verification](architecture.md#build-and-verification) lists the cases each version needs and which of them that acceptance executes.

## Levels and commands

| Level | Location | Command | What it establishes |
| --- | --- | --- | --- |
| Contract/unit and integration | None in this repository | None | Nothing |
| Browser acceptance, React 19 | `cli` repository, the `web` acceptance | Its README | The React 19 cases [build and verification](architecture.md#build-and-verification) names as executed |
| React 17 and React 18 | None | None | Nothing: their cases remain requirements |

## Exceptions and limits

- The hook examples in the documentation are documentation, not executed integration evidence.
- Routing, error and CSS-failure cases remain to be written for React 19, and every case for React 17 and 18.
- Whoever adds tests here follows the section below and names the compiler, runtime and browser a run exercises.

## Test organization and source fixtures

These rules are shared by every Beyond repository.

- Contract/unit and integration tests live in `test/` or `tests/`; complete journeys against an installed, composed or exported product live in `acceptance/`, with a README of their own. Harness infrastructure (servers, registries, process lifecycle, copying and substitution) lives in a `support/` directory of the consuming area.
- Applications, packages, modules, documents and assets a test exercises are checked-in files with their real extensions and directory structure under the consuming area's `fixtures/`. Each fixture group has a README naming its purpose, entry modules, the tests that use it, their command, the expected behavior and any intentionally invalid part. A reader inspects the example without running or decoding a generator.
- A harness copies the fixtures it runs or edits to a unique temporary directory, substitutes only explicit values such as versions, ports or origins, and never writes the checked-in files, even when a run fails. Credentials, machine paths and build output are never fixture source.
- Small input values, expected values, protocol payloads and short edits stay inline. Source is generated only when generation is the behavior under test (size or memory stress, combinations, deliberately malformed input); the guide states why, the parameters that reproduce it and how to inspect what was generated.
- Fixtures stay out of the repository's production compilation, discovery and packaging.
- Migrating a test preserves its scenario identities, its positive, negative and recovery cases and its real execution path; an existing failure stays reported as a failure.
