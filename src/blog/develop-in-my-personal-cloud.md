---
layout: article
title: Develop in my personal cloud
date: 2023-11-25
categories: ["Homelab"]
---

Took time last night and got Coder setup as a locally running Codespaces alternative.

<!-- excerpt -->

I have been working with the idea of remote development environments for a while, mostly focused on being able to use an iPad as a development machine. I have resisted using Codespaces, because, like most of my homelab efforts, I want a self owned solution so that I can have personal responsibility for the parts of my infrastructure that I can.

The setup hit a few snags initially.

## Discoveries

1. If you are going to use wildcard DNS in the Cloudflare Tunnel, you have to manually setup the wildcard DNS record in Cloudflare. 
2. In Safari, sometimes the VSCode in browser will not be available. A refresh has solved that so far.
3. Being able to sync VSCode settings between instances is a massive positive. I've used this for a while, but only between my personal and work machines. Now that any machine I sit at is a dev box, this is going to be a time saver.
4. My Coder template uses your personal dotfiles. I have to invest the time in those now that I have a use case for them.

## Side quest

During the setup of the [Beelink Mini PC](https://www.amazon.com/gp/product/B08XBVXNFP/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1) that I'm using to host this, I used my iPad as a monitor using [Genki Studio](https://apps.apple.com/us/app/genki-studio/id6466343285). I now have a 10 inch portable always with me HDMI monitor. I was able to use the iPad to display the computer that I'm using to host the software to be able to code on the iPad. It rhymes.

![iPad connected to mini PC as a monitor](https://msb.fyi/assets/images/ipad-monitor.jpg "iPad as mini PC monitor")
