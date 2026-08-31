[← Back to Browzen](README.md)

# Browzen Dark Network

Browzen Dark Network is a DNS-free `.bzn` address format built directly into Browzen. Browzen resolves the destination locally, never sends the `.bzn` name to public DNS, and preserves the complete `.bzn` hostname for the website, JavaScript, storage, CSP, and CORS.

## Address formats

### Direct IP

Append `.bzn` to an IPv4 address:

```text
0.0.0.0.bzn
```

`0.0.0.0.bzn` demonstrates the address format only. `0.0.0.0` is an unspecified, non-routable address and is not a usable public website destination. A real server uses its real public IPv4 address in the same format.

### Domain target

Append `.bzn` to a conventional domain:

```text
example.com.bzn
```

Browzen resolves the underlying `example.com` through normal DNS, connects to that destination, and keeps `example.com.bzn` as the browser and HTTP hostname.

Paths, query strings, and ports are preserved:

```text
example.com.bzn/docs?id=12
example.com.bzn:8080/api
```

## DNS setup

There is no public `.bzn` zone and no `.bzn` DNS record to create.

- For `0.0.0.0.bzn`-style addressing, the IPv4 address is already part of the BZN name, so no DNS record is used.
- For `example.com.bzn`-style addressing, configure the underlying `example.com` A, AAAA, or CNAME records normally. Browzen removes only the final `.bzn` label when locating the network destination.
- Never configure a wildcard public DNS record for `.bzn`.

## Backend setup

The backend must accept the complete BZN hostname. A request for `example.com.bzn` arrives with headers similar to:

```http
Host: example.com.bzn
Origin: http://example.com.bzn
Sec-Browzen-Network: 1
```

Example Nginx virtual host:

```nginx
server {
    listen 80;
    server_name example.com.bzn;

    add_header Access-Control-Allow-Origin "http://example.com.bzn" always;
    add_header Content-Security-Policy "default-src 'self'; connect-src 'self' http://*.bzn ws://*.bzn" always;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Host $host;
    }
}
```

Example Node.js host check:

```js
app.use((req, res, next) => {
  if (req.hostname !== "example.com.bzn") return res.sendStatus(404);
  next();
});
```

The `Sec-Browzen-Network` header is a compatibility marker, not authentication. Any custom HTTP client can reproduce a header, so a backend must not use it as proof of identity.

## JavaScript and browser origin

Inside a BZN page:

```js
location.hostname === "example.com.bzn";
fetch("/api/status");
new WebSocket("ws://example.com.bzn/socket");
```

Relative requests remain inside the BZN origin. Host-only cookies, localStorage, IndexedDB, and Service Worker scope are isolated from the conventional `example.com` origin.

Avoid hard-coding `http://example.com` in page scripts, because that intentionally leaves Browzen Dark Network and creates a different origin.

## Transport and security

Browzen Dark Network currently uses HTTP. Public certificate authorities cannot issue a normal TLS certificate for the private `.bzn` suffix, and Browzen does not bypass certificate validation. Network operators may be able to read or modify unencrypted HTTP traffic.

Browzen Dark Network is an alternative addressing layer, not Tor, a VPN, or an anonymity network. It does not hide a visitor's IP address or a server's location.

Private, loopback, link-local, and unspecified IP destinations can expose services on the user's own computer or network. Sites must never cause visitors to access such destinations without their clear knowledge and consent.

## Responsible use

Do not use Browzen Dark Network to violate applicable law, harm others, distribute illegal material, gain unauthorized access, evade access controls, or infringe third-party rights. Operators and visitors are responsible for their own activity and content.

Browzen Dark Network is provided “as is,” without warranties. To the maximum extent permitted by law, NeuralNexusLab and contributors are not liable for illegal use, service interruption, data loss, security incidents, damages, or claims arising from its use.
