import imageio.v3 as iio
import imageio.v2 as iio2
import sys

if __name__ == "__main__":
    image_path = sys.argv[1]
    output_mp4 = sys.argv[2]
    im = iio.imread(image_path)
    w = 420
    h = 560
    with iio2.get_writer(output_mp4, 
            format='FFMPEG',
            mode='I',
            fps=1) as ffmpeg_w:

        for y in range(0, 6):
            for x in range(7, 0, -1):
                x_i = x * w
                y_i = y * h
                tile = im[y_i:y_i + h, x_i:x_i + w, :]
                ffmpeg_w.append_data(tile)