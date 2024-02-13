---
title: 100 Days of Homelab
date: 2023-01-09T05:11:53.089Z
categories:  [ "Homelab" ]
---

Four months ago, my oldest started his Freshmen year at Coe College. At drop off, I decided that I needed a distraction.
<!-- excerpt -->

When I got home I found the #100DaysOfHomelab project that [Techno Tim](https://techno-tim.github.io) had started. It was the push I needed and I dove into working on my Homelab with a direction for the first time in a long time.

Initial setup consists of the following:

- Three Raspberry Pi 4s that form a Docker Swarm cluster. This runs most of my internal apps
- One Raspberry Pi 4 that runs [Umbrel](https://getumbrel.com) for Bitcoin and Lightning
- NUC Intel Core i7 for media server
- Synology 920+ for file storage

I'm connected the Synology to the Docker Swarm cluster so that all of my apps can access the file storage. I've got SSL setup using an internal domain name that isn't accessible outside my network, gated by [Tailscale](https://tailscale.com). This may be my favorite part of the setup, because when I connect any machine to the Tailscale network, that machine acts as if it is on my local network. I have [dnsmasq](https://dnsmasq.org) running so that the internal domains resolve to a [NGINX Proxy Manager](https://nginxproxymanager.com) instance that then controls all the traffic to internal applications.

I do have a few services that run on the local system that are then accessible outside the newtork, but are cached by Cloudflare. Using Cloudflared to create a tunnel into the network that can be seen from the outside so that I don't have to worry about Dynamic DNS.