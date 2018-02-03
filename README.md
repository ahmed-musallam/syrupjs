# syrupjs
[![Build Status](https://travis-ci.org/ahmed-musallam/syrupjs.svg?branch=master)](https://travis-ci.org/ahmed-musallam/syrupjs) ![](http://img.badgesize.io/ahmed-musallam/syrupjs/master/dist/syrup.js.svg)
![](http://img.badgesize.io/ahmed-musallam/syrupjs/master/dist/syrup.js.svg?compression=gzip)
>A tiny pub/sub micro-framework for distant component interaction
> 
> **To be clear**, one-way interactions via pub-sub pattern.

![syrupjs](syrupjs.png)

## Why another js framework
this one is less that 1KB and does one thing, create a declarative way to publish custom events when native JS events are triggered.

## Let me explain
When building components with react, angular or any other "bundled" framework, components have a defined way of interaction (defined by the framework). But when building server-side components on a CMS, such as Adobe Experience Manager (AEM), those components are effectively HTML partials that are rendered separately then stitched together to form the HTML doc, essentially to enable a fantastic component authoring experience. As such, there is no good way to communicate between components.

## Enter syrupjs!
syrupjs publishes native JS events such as `click` with a custom name. Components can subscribe to the event and react accordingly.

> Syrup's pub/sub is enabled by the amazingly minuscule [jquery-tiny-pubsub](https://github.com/cowboy/jquery-tiny-pubsub) 


## Example
you have a button component

```html
<button data-syrup="click:show-me-the-money">
  show me the money
</button>
```
> notice the `data-syrup="click:show-me-the-money"` we'll get to that in abit

And you have a mony component that is hidden by default

```html
<div class="js-money" style="display:none">
 MONEY!
</div>
```
and you set your money component JS to listen for `show-me-the-money` event:

```javascript
 $(function(){
 	$.subscribe('show-me-the-money', function(){
 		$('.js-money').show();
 	})
 })
```

viola! when you click on the button, the `.js-money` element is displayed!

> working jsfiddle: [https://jsfiddle.net/6598m77o/](https://jsfiddle.net/6598m77o/)

You can see how this pattern can enable component interactions, where each component subscribes to certain events in order to change it's state (that is, it's the actual DOM).


## `data-syrup`
The core of this library is the `data-syrup` attributes, the value of that attribute is defined by the following BNF

```
<attribute-value>       ::= <comma-separated-pairs>
<comma-separated-pairs> ::= <pair> | <pair> , <comma-separated-pairs>
<pair>                  ::= <native-js-event> : <custom-event-to-publish>
```

the following values are valid:

* `click:custom-event`
* `click:custom-click-event,hover:custom-hover-event`
* `mouseenter:show-me-the-money, mouseleave:hide-the-money, click:make-mony-blue`

effectively a comma separated pairs, where each pair is colon-separated. The first value of the pair is a native JS event that will be registered to the current element. The second is a custom event name to be published when the native Js event is triggered.

> The native event name is passed to jQuery's [.on](http://api.jquery.com/on/) method
> 
> Refer to javascript's [native events](https://developer.mozilla.org/en-US/docs/Web/Events) for the complete list.

`<button data-syrup="click:custom-event">` = on click of this button, publish the event `custom-event`.

## Initializing syrup elements dynamically
If you are creating elements dynamically and setting the `data-syrup` attribute on an element, you can trigger syrup initialization for the new element with `$('.your-element').syrup()`
