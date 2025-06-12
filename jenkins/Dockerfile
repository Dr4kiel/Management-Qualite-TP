FROM jenkins/jenkins:lts

USER root

RUN apt-get update && \
    apt-get install -y docker.io docker-compose \
    && apt-get clean

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

COPY casc.yaml /var/jenkins_home/casc.yaml
ENV CASC_JENKINS_CONFIG=/var/jenkins_home/casc.yaml

USER jenkins
