FROM yas/debian

RUN curl https://install.meteor.com/ | sh

WORKDIR /opt/meteor
RUN \
    meteor create app \
    && cd app  \
    && meteor add session  \
    && meteor add isotope:isotope  \
    && meteor add mizzao:jquery-ui  \
    && meteor add twbs:bootstrap  \
    && echo done.

ENV LANG=en_US.utf8 LC_ALL=en_US.utf8

EXPOSE 22 3000
CMD service ssh start && cd app && meteor
