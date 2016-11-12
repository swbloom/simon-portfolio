
Retina Images using the <picture> Element

THE CODE (in case you don't feel like reading the article):
<picture>
  <source srcset="/images/pngs/circle-2x.png" media="(min-device-pixel-ratio: 2), (min-resolution: 192dpi)")>
  <img src="images/pngs/circle.png" width="200px" alt="a round white circle">
</picture>

Ah, retina displays. They make our websites look crisp and beautiful, but here's the rub: they double the amount of images we need to make sure our website looks pretty on all devices. Apple giveth, and Apple taketh away.

If you display a 200px image of a circle on a retina device, it will look blurry. This is because retina devices have double the pixel density of their counterparts. The solution? Insert a 400px circle instead and use CSS to cut its width and height in half, bringing it back down to 200px. Same size, but double the pixel density, meaning that it'll look sharp on retina devices.

Historically this has been a major pain point for developers, since it means having to have two versions of all of your images and figuring out how to avoid serving 2x images to non-retina devices, needlessly slowing them down and making you look and feel like a total chump.

Different strategies have been employed, mostly based around using background images and media queries that target retina devices. This is less than ideal - background images can't have any alt text, which means your images won't be accessible. It feels dirty and wrong!

Enter the picture element. At its most basic, it looks like this:

<picture>
  <img src="circle.png" alt="a round white circle">
</picture>

Just a wrapper around our image. Nothing too fancy yet. But here is where it starts to get pretty awesome.

<picture>
  <source srcset="circle-2x.png" media="(min-device-pixel-ratio: 2), (min-resolution: 192dpi)">
  <img src="circle.png" alt="a round white circle">
</picture>

The <source> element allows us to swap in an alternative image source to use when a certain condition in the "media" attribute is met. In this case, we're targeting devices that have a pixel ratio of 2, and a minimum resolution of 192dpi - two conditions that tip off the browser that the user is on a retina device. If these two conditions are met, 'circle.png' will be swapped out with circle-2x.png and the user will see the retina image instead!

What's really awesome about this is that the retina image will ONLY load if the picture element detects the user is on a retina device. This means faster loading times for non retina devices.


Notes
- you can have multiple srcsets
- support
- fallback

-Comment on how fallback works
