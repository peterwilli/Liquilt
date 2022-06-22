FROM debian:bookworm-slim
MAINTAINER Peter Willemsen <peter@codebuffet.co>

RUN echo "Installing dependencies..." && \
    apt-get update && \
    apt-get install -y curl gpg && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends python3 ffmpeg python3-pip nodejs  && \
	rm -rf /var/lib/apt/lists/*

RUN echo "Installing Python dependencies" && \
    pip3 install liquilt==0.2

# Add dev user
RUN useradd -ms /bin/bash liquilt && \
    usermod -aG sudo liquilt && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER liquilt

WORKDIR /src
CMD npm install && npm run start