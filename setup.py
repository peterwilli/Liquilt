import setuptools
setuptools.setup(
    name='liquilt',
    version='0.1',
    scripts=['./scripts/liquilt'],
    author='Peter Willemsen <peter@codebuffet.co>',
    description='Create 3D views of a quilt!',
    packages=['liquilt'],
    install_requires=[
        'setuptools',
        'imageio==2.19.3',
        'imageio-ffmpeg==0.4.7',
        'numpy==1.22.4',
        'Pillow==9.1.1'
    ],
    python_requires='>=3.5'
)
