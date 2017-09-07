 FROM ruby:2.2
 RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
 RUN apt-get install -y nodejs
 RUN gem install jekyll && gem install jekyll-sitemap && gem install foreman
 WORKDIR /usr/src/app
 COPY . /usr/src/app
 RUN mkdir -p ~/.ssh && cd /usr/src/app && cp config ~/.ssh/
 RUN chmod 600 /usr/src/app/github
 RUN git submodule init && git submodule update --remote
 RUN git config --global user.email ikotlyar.freshcode@gmail.com
 RUN cd freshcodeit.github.io/ && git checkout master && git remote set-url origin git@github.com:ilyafreshcode/freshcodeit.github.io.git && cd ../
 RUN npm install && npm cache clean --force
 CMD foreman start