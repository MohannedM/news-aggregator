FROM bitnami/laravel
ENTRYPOINT [ "" ]
EXPOSE 8000
RUN sudo useradd -m --shell /bin/bash app
WORKDIR /app
COPY --chown=app:app . /app

RUN sudo apt update

RUN curl -sS https://getcomposer.org/installer -o composer-setup.php && HASH=`curl -sS https://composer.github.io/installer.sig` && php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
RUN sudo composer install

USER app
RUN echo -n "" > database/database.sqlite
RUN php artisan key:generate
RUN php artisan migrate:fresh --seed --env=example
ENV PORT=8000


CMD php artisan serve --host=0.0.0.0 --port=$PORT --env=example
