# Browzen for Linux

Download the Linux x86_64 executable using the button in the [README](README.md).
No Python installation is required on the target desktop.

```sh
chmod +x Browzen-linux-x86_64
./Browzen-linux-x86_64
```

## Compatibility

Tested on Debian 13 x86_64 with glibc 2.41, GTK libraries and an X11 display.
A compatible Linux desktop and native system libraries are required. Older
distributions, ARM64 and Wayland-only desktops have not been tested. Do not run
Browzen as root. This Linux file does not run on Windows or macOS.

The distribution is a single executable, but it extracts a temporary browser
runtime while running. The temporary filesystem must allow execution and have
enough free space. Profiles and caches are session-only and cleaned on normal
exit; power loss, forced termination, OS logs and swap can leave traces.

## Engine and checks

This Linux build uses the official Tor Browser 15.0.26 Linux engine with Browzen's
interface and policies. The upstream archive's detached signature was verified
against the Tor developers primary key
`EF6E286DDA85EA2A4BA7DE684E2C6E8793298290`. Browzen is not an official Tor Project
product and is not claimed to be security-equivalent to Tor Browser.

Smoke tests confirmed the Browzen interface and logo, Tor bootstrap, loading
example.com, native fingerprint resistance, content sandbox level 6, Fission,
SOCKS remote DNS, disabled direct fallback, UTC offset 0, CPU concurrency 4 and
disabled WebRTC. The packaged executable started Firefox and Tor without test
automation enabled. Terminating its inner launcher left no observed owned
processes or new temporary entries. This is not a complete security audit.

SHA-256 of `Browzen-linux-x86_64` (184088280 bytes):

```text
9ac75f9a885df80661c41b61e44fd370fe8e32ea0c0262e507becd9d53616367
```

Verify the download with `sha256sum Browzen-linux-x86_64`. A matching checksum
checks file identity, not the absence of vulnerabilities. No macOS build is
available yet. Upstream component licenses remain in the bundled runtime;
Browzen's own code is Apache-2.0.
