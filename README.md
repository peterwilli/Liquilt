# Create real-time, fast 3D views of your quilts!

[Demo video here!](https://www.youtube.com/watch?v=JwtFb_bqtG4)

Got a Looking Glass? With Liquilt you can share them on the web in the fastest way possible! We convert your quilt into a specially crafted file to display them fast no matter what you run it on!

- Fast, web-components based library
- The tiniest 3D format
- Pre-computed, real-time rendering
- Open source - feel free to help out!

# Live Demo

See https://emeraldodin.com/liquilt_demo

# I don't want to run a server!

I started a little hosting server at [liquilt.org](http://liquilt.org) (be gentle it runs on a Raspberry Pi 4)

# How to get started

I assume you have Python and Pip installed

- Install the Liquilt CLI to convert your quilt to the required format:
    - `pip install liquilt`

- Run the command to convert your quilt to the required format (you can use test_quilt.png if you wish, it is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0))

- Now you can use the component as shown in the example folder! (Note, it needs to be hosted on a (local) static file server)
    - You can also use the [Liquilt uploader](https://emeraldodin.com/liquilt_uploader) to upload your result if you don't want to host a page.


# To do

- [x] A server-side hosting platform
- [x] So far only mouse works, we need support for mobile