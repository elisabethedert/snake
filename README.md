# Snake

Das Spiel Snake wird im Einzelspieler-Modus gespielt. Die Snake wird mit den Pfeiltasten geteuert und Ziel ist es möglichst viele Früchte zu fressen, um besonders viele Punkte zu erhalten. Je mehr Früchte gefressen werden, desto länger wird die Schlange. Punkte können verloren gehen, wenn die Snake über sich selber fährt. Im Laufe des Spiels tauchen Hindernisse auf, die umfahren werden müssen, um das Spiel nicht zu beenden. Ebenfalls wird das Spiel durch das Kollidieren mit der Mauer beendet. Die Superfrucht, die zufällig statt anderen Früchten auftaucht, bringt die Snake in einen Modus, in dem Hindernisse (außer die Mauer) und sich selbst durchfahren werden können ohne Spielpunkte zu verlieren oder das Spiel zu beenden.

Viel Spaß beim Spielen!

Projekt-URL: https://m-elisabeth-edert.rm.mylab.th-luebeck.de/snake/www/index.html

## Ordnerstruktur des Projekts snake

    |-src    Ordner für den Sourcecode des Kaboom Projekts
    | |-config  Unterordner für Konfigurationsdateien
    | |-functionlities  Unterordner für alle Klassen mit den Funktionen des Spiels
    | |-scenes  Unterordner für alle Szenen des Spiels
    |-www    Ordner für Assets und die index.html so wie das built js bundle
    | |-favicon  Unterordner für das Favicon
    | |-font     Unterordner für Font-Dateien
    | |-sound    Unterordner für Sound-Dateien
    | |-sprites  Unterordner für Bilddateien und Sprites

## Ordnerstruktur des Repositorys

    |-public    Auf dem Webserver vorliegende Dateien.
    | |-images  Unterordner für Bilddateien
    | |-css     Unterordner für CSS-Dateien
    | |-js      Unterordner für JavaScript-Dateien
    |
    |-doku      Die ausgearbeitete Dokumentation und zugehörige Dateien.

## Build-Prozess und Docker

Sobald an dem master-Branch dieses Repositories Veränderungen vorgenommen bzw. gepusht werden, wird automatisch ein Build-Prozess angestoßen, welcher das [Deployment Ihres Projektes](https://m-elisabeth-edert.rm.mylab.th-luebeck.de) aktualisiert. Die Dateien `Dockerfile` und `.gitlab-ci.yml` steuern diesen Build-Prozess, und sollten von Ihnen in der Regel nicht verändert werden! Bei Interesse finden Sie weitergehende Informationen und Anleitungen zu Docker z.B. [hier](https://doku.mylab.th-luebeck.de), diese sind jedoch in diesem Fach nicht prüfungsrelevant.
