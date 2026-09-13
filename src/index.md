---
layout: page
title: MSB.fyi | Home of Michael Sean Becker
eleventyNavigation:
  key: home
  order: 1
pagination:
  data: collections.blog
  size: 5
  alias: articles
---

<section class="open">
<h1 class="hi">HI THERE<span class="ex">!</span></h1>
<p class="role">I'm a <strong>dad of two</strong>, semi-regular <strong>podcaster</strong>, <strong>home lab tinkerer</strong>, and <strong>Engineering and Technology Leader</strong>.</p>
<div class="credo">
<p>I believe in the open and independent web, and I've been working on this site for the last two years to keep the <a href="https://indieweb.org">Indieweb</a> spirit alive in me.</p>
</div>
<div class="find">
<span class="lbl">Find me on the web</span>
{% msbButton "Mastodon", { variant: "primary", href: "https://social.lol/@msb", dot: true } %}
{% msbButton "Pixelfed", { variant: "secondary", href: "https://pixelfed.social/@msb" } %}
{% msbButton "Github", { variant: "secondary", href: "https://github.com/michaelseanbecker" } %}
</div>
<div class="stamp">
<div class="sl">Warning</div>
<div class="sb">This site is a constant work in progress and many things will break as I experiment. Built on 11ty.</div>
</div>
</section>

<section>
<div class="plate">
<span class="no">01</span>
<h2>This Week In Links</h2>
</div>
{% include "./_includes/components/thisWeekInLinks.njk" %}
</section>

<section>
<div class="plate">
<span class="no">02</span>
<h2>Latest Posts</h2>
<span class="sp"></span>
<a href="/blog/">All posts</a>
</div>

{% include "./_includes/components/articleList.njk" %}

</section>
