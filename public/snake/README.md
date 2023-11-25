# Folder structure

- `src` - source code for your kaboom project
- `www` - distribution folder, contains your index.html, built js bundle and static assets


## Development

```sh
$ npm run dev
```

will start a dev server at http://localhost:8000

## Distribution

```sh
$ npm run build
```

will build your js files into `www/main.js`

```sh
$ npm run bundle
```

will build your game and package into a .zip file, you can upload to your server or itch.io / newground etc.


## ToDos

Bildmaterial:

    Die Grafiken werden als Pixelgrafiken geladen, damit Spritesheets genutzt werden können

    Die Optik soll grafisch orientiert mit reduzierten Details sein, keine Pixeloptik


Ansichten des Spiels:

Spiel ist geladen:

    ein Startscreen wird angezeigt, welcher Buttons zeigt zum

        Spiel starten

        Steuerung ansehen

        Highscore-Tabelle ansehen


Spiel starten:

    DONE der Spieler hat eine Vogelperspektive auf ein begrenztes rechteckiges Spielfeld 

    DONE das Spielfeld besteht aus Feldern und ist durch eine Mauer begrenzt

        TODO festes Raster 30 x 20 (BxH)  Felder

    TODO eine kurze Schlange (Kopf-Teil + Schwanz-Teil) befindet sich zum Start mitten auf dem Spielfeld und bewegt sich in eine Richtung

    DONE über dem Spielfeld befindet sich ein Counter, der bei 0 startet


Steuerung ansehen:

    eine Beschreibung welche Tasten benutzt werden können wird angezeigt


Highscore-Tabelle ansehen:

    die Highscores werden in einer Tabelle angezeigt


Spiel ist beendet:

    der aktuelle Highscore wird dem erreichten Punktestand gegenübergestellt

        (falls ein neuer Highscore erreicht wurde, wird dies angezeigt)

        (falls ein Eintrag in der Tabelle möglich ist wird ein Eingabefeld angezeigt (s.”Spielstand speichern”))

    Buttons, die

        das Spiel neu starten

        (die Highscoretabelle anzeigen lassen)

Snake als PC:

    Steuerung: 

        Pfeiltaste links -> nach links

        Pfeiltaste rechts -> nach rechts

        Pfeiltaste hoch -> nach oben

        Pfeiltaste runter -> nach unten

    DONE die Snake kann sich in dem begrenzten Feld bewegen

    die Snake bewegt sich solange in eine Richtung, bis der Spieler eine Pfeiltaste drückt

    die Richtung kann pro Tastendruck nur um 90° gewechselt werden

Spielpunkte erreichen:

    DONE Früchte müssen gefressen werden, die im Spielfeld auftauchen (pro Frucht gibt es einen Punkt)

        TODO es gibt verschiedene Früchte wie Äpfel, Birnen, Bananen und Orangen

    TODO bei jedem gewonnenen Punkt wird ein Körper-Teil zwischen Kopf- und Schwanz-Teil hinzugefügt

    TODO eine Frucht taucht mit einer kurzen Spritesheetanimation aufpoppend auf

        DONE Ein Zähler zählt die gefressenen Obststücke und zeigt sie am oberen Rand außerhalb des Spielfeldes an

    TODO Spielpunkte können verloren werden, wenn die Schlange gegen sich selbst läuft und der hintere Teil dadurch abgefressen wird

Zusätzliche Effekte:

    TODO Super-Obst kann auftauchen - wird das gefressen, dann kann die Schlange über sich selber fahren ohne sich zu kürzen und kann Büsche und Maulwürfe überfahren, ohne das Spiel zu beenden 

        Dauer des Effekts: 3 Sekunden

        zusätzliche Spielpunkte: keine, es wird lediglich die “Superkraft” ausgelöst


DONE Level 1 (zum Spielbeginn):

    keine zusätzlichen Gegenstände im Feld


Level 2 (ab 10 Punkten):

    Maulwurfshügel werden von Maulwürfen (NPCs) in regelmäßigen Abständen ausgegraben (Animation mit Spritesheet)

    bei Gegenfahren gegen einen Maulwurfshügel ist das Spiel beendet

    Platzeinnahme 1x1 Feld


Level 3 (ab 20 Punkten):

    große Büsche wachsen zusätzlich aus dem Boden, die mehr Platz einnehmen als Maulwurfshügel und schwerer zu umfahren sind

    bei Gegenfahren gegen einen Busch ist das Spiel ebenfalls beendet

    Büsche verschwinden nach einiger Zeit wieder

    Platzeinnahme 1x1-3x3 Felder


Ziel des Spiels:

    die Snake möglichst lang werden zu lassen und damit eine möglichst hohe Punktzahl erreichen


Spiel beenden:

    die Snake läuft gegen eine Mauer (Level 1), einen Maulwurfshügel (ab Level 2), einen Busch (ab Level 3)


Weitere Animationen:

    wenn die Snake gegen etwas gegen fährt: Zusammenstoß darstellen

    wenn die Snake etwas frisst: Maul aufreißen und schließen darstellen

        Animationen des PCs und des NPCs sollen mit Hilfe von Sprite Sheets erstellt werden

        Auch der Schlangenkörper soll mithilfe von Spritesheets erstellt werden, damit die Schlange bei Abbiegungen ohne Kanten dargestellt werden kann

>  mögliche Funktionen, die Kaboom bereitstellt: loadSprite(), sprite()