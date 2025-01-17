# Projekt Dokumentation für die Umsetzung des Spiels Snake

Dieses Projekt ist im Rahmen meines Studiums an der Technischen Hochschule Lübeck im Fach Rich Media Anwendungen entstanden.
Das Spiel Snake wird im Einzelspieler-Modus gespielt und handelt von einer Schlange, die in einem festgelegten Bereich bewegt wird. Die Snake wird mit den Pfeiltasten gesteuert und Ziel ist es möglichst viele Früchte zu fressen, um besonders viele Punkte zu erhalten. Je mehr Früchte gefressen werden, desto länger wird die Schlange. Punkte können verloren gehen, wenn die Snake über sich selbst fährt. Im Laufe des Spiels tauchen Hindernisse auf, die umfahren werden müssen, um das Spiel nicht zu beenden. Ebenfalls wird das Spiel durch das Kollidieren mit der Mauer beendet. Die Superfrucht, die zufällig statt anderen Früchten auftaucht, bringt die Snake in einen Modus, in dem Hindernisse (außer die Mauer) und sich selbst durchfahren werden können, ohne Spielpunkte zu verlieren oder das Spiel zu beenden.

## Development

```sh
$ npm install
```

installiert die erforderlichen node moduls
```sh
$ npm run dev
```

startet einen Entwicklungsserver unter http://localhost:8000

## Distribution

```sh
$ npm run build
```

erstellt einen optimierten Produktionsbuild unter `www/main.js`

## Konzept und dessen Umsetzung: 
<details>
<summary>Mehr lesen</summary>

Es soll das Spiel Snake als einfache Clientanwendung für Singleplayer entwickelt werden.

### Ansichten des Spiels

Startscreen:
Nachdem das Spiel geladen ist, wird ein Startscreen angezeigt, welcher Buttons beinhaltet, die das Spiel starten oder die Steuerung anzeigen lassen. Während der Entwicklung des Spiels kamen zur besseren Benutzerführung eine Überschrift und eine Spielanleitung auf der Startseite hinzu. Die Highscore-Tabellen sind in diesem Spiel nicht mit implementiert worden und werden daher nicht mit angezeigt.
Eine kleine Animation zeigt mittig über den Texten eine züngelnde Schlange.

Navigation:
Wird auf den Button “Navigation” geklickt, erhält der Spieler Informationen zur Steuerung der Snake. Über weitere Buttons kann von dieser Ansicht zurück zum Startscreen gelangt werden.

Spiel:
Der Spieler hat eine Vogelperspektive auf ein begrenztes rechteckiges Spielfeld. Das Spielfeld besteht aus 15x10 Feldern und ist durch eine Mauer begrenzt. Die einzelnen Spielfelder sind optisch nicht zu erkennen und werden lediglich durch die Anordnung der Objekte während des Spiels deutlich. Die Mauer macht deutlich, dass sich der Spieler nicht aus dem Feld heraus bewegen kann. Ursprünglich war ein Raster von 30x20 Feldern geplant, welches jedoch dazu geführt hat, dass die Grafiken zu klein dargestellt wurden und das Spiel langwieriger wurde. So kann es nun auch dazu kommen, dass die Schlange länger als die Spielfeldbreite wird und der Schwierigkeitsgrad steigt. Eine Halbierung der Werte hat sich als Lösung des Problems gut angeboten.

Begonnen wird das Spiel mit einer kurzen Schlange, bestehend aus Kopfteil und Schwanzteil. Die Snake befindet sich bei jedem Spielstart oben links mittig, sodass sich beim Spielstart gut orientiert werden kann. Aus diesem Grund wurde sich gegen einen Start mitten auf dem Spielfeld entschieden. Die Snake bewegt sich automatisch nach unten, bis der Spieler eine andere Richtung vorgibt.
Oben links am Spielfeldrand befindet sich ein Counter, der bei 0 startet.

Spiel ist beendet:
Wenn das Spiel beendet ist, wird ein Screen eingeblendet, der den erreichten Punktestand anzeigt. Darunter befindet sich ein Kommentar zur erreichten Punktzahl und zwei Buttons. Ein Button lässt das Spiel erneut starten, der andere verweist auf die Navigationsansicht. Da keine Highscoretabellen mit implementiert wurden, werden an dieser Stelle keine Punktevergleiche angegeben. Über den Texten befindet sich wie schon auf dem Startscreen die züngelnde Schlange.

### Snake als PC

Steuerung:
Die Snake als PC (Playable Character) kann in dem begrenzten Feld bewegt werden und wird mithilfe der Pfeiltasten auf der Computertastatur gesteuert. Die Snake bewegt sich solange in eine Richtung, bis der Spieler eine Pfeiltaste drückt, die nicht die Richtung ist, in die sich die Snake bereits bewegt. Die Richtung kann lediglich um 90° gewechselt werden.

Spielpunkte erreichen:
Um Spielpunkte zu erlangen, müssen Früchte gefressen werden, die im Spielfeld auftauchen. Pro Frucht gibt es einen Punkt. Insgesamt gibt es 4 verschiedene Früchte (Äpfel, Orangen, Ananas und Erdbeeren), die über eine kurze Spritesheet Animation eingeblendet werden. Frisst die Schlange eine Frucht, wird dem Score ein Punkt hinzugefügt und der Schlange ein Körperteil zwischen Kopf- und Schwanzteil hinzugefügt. Spielpunkte können verloren werden, wenn die Schlange gegen sich selbst läuft und der hintere Teil dadurch abgefressen wird.

### Level und NPCs

Level 1 (zum Spielbeginn):
Das Feld ist frei von Hindernissen und es befinden sich nur die Snake und eine Frucht auf dem Feld.

Level 2 (ab 4 Punkten):
Maulwurfshügel werden von Maulwürfen als NPCs (Non-Playable Character) in regelmäßigen Abständen ausgegraben. Steuert die Schlange gegen einen Maulwurfshügel, ist das Spiel beendet. Ein Maulwurfshügel nimmt ein 1x1 Feld ein. Die geplante Punktzahl lag bei 10, die erreicht werden müssen. Die Zahl hat sich jedoch als zu hoch erwiesen und wurde auf 4 runtergesetzt.

Level 3 (ab 9 Punkten):
Größere Büsche wachsen zusätzlich aus dem Boden, die mehr Platz einnehmen als Maulwurfshügel und dadurch schwerer zu umfahren sind. Bei einer Kollision mit einem Busch ist das Spiel beendet. In der Entwicklung des Spiels hat es sich erwiesen, dass die Büsche in einer festen Größe auftauchen, da es durch die Maulwurfshügel bereits kleine Hindernisse gibt. Alle Hindernisse verschwinden, sobald ein neues Hindernis erzeugt wird.

### Zusätzliche Effekte

Superobst in Form von allen Früchten in einer Animation kann auftauchen. Wird das gefressen, dann kann die Schlange über sich selbst fahren, ohne sich zu kürzen und kann Hindernisse überfahren, ohne das Spiel zu beenden. Das Fressen von Superobst bringt keine Spielpunkte. Die Dauer des Effekts wurde für eine Zeitspanne von 3 Sekunden geplant, jedoch hat sich während der Umsetzung gezeigt, dass das kaum einen Mehrwert hat (s. Probleme und Lösungen, die während der Entwicklung auftraten - wait() Funktion). Um weitere Punkte bekommen zu können, müssen weitere Früchte gefressen werden, welche dadurch den Schutz wieder aufheben.

### Ziel des Spiels

Die Snake soll möglichst lang werden, um eine möglichst hohe Punktzahl zu erreichen. Das Spiel wird beendet, wenn die Snake mit Hindernissen kollidiert oder gegen die Mauer gesteuert wird.

### Animationen

Animationen des PCs und des NPCs sollen mit Hilfe von Sprite Sheets erstellt werden. Auch der Schlangenkörper soll mithilfe von Spritesheets erstellt werden, damit die Schlange bei Abbiegungen ohne Kanten dargestellt werden kann. Es wurde sich gegen die beiden Animationen “Zusammenstoß” und “Maul öffnen” entschieden, da sich in der Entwicklung die Darstellung als zu kleinteilig dargestellt hat.

### Sound

Für verschiedene Ereignisse sollen Sounds hinterlegt werden. Dazu gehören ein Sound beim Essen einer Frucht, beim Zusammenstoß, sowie verschiedene Sounds beim Einblenden von normalen Früchten, der Superfrucht und den beiden Hindernissen. Eine dauerhaft spielende Musik wurde nicht mit implementiert, da sie vermutlich ohnehin sofort ausgeschaltet oder die einzelnen Sounds überdeckt werden.

## Softwarearchitektur

### Framework

Die Entscheidung, welches Framework verwendet werden soll, lag zwischen Kaboom.js und Phaser. Kaboom eignet sich besser für kleine Spiele mit reduzierten Funktionen und hat für dieses Projekt den Vorteil der weniger umfangreichen Einarbeitungszeit und Konfigurationsaufwand. Die Wahl hat sich als sinnvoll erachtet und das Spiel ließ sich weitestgehend gut darin umsetzen.

### Funktionen des Frameworks

In der Entwicklung des Spiels konnte oft auf Funktionen des Frameworks zurückgegriffen werden. Wie schon in der Konzeption geplant, kamen insbesondere die Funktionen onCollide(), loadSprite(), loadSound(), play(), onKeyPress() oder onClick() zum Einsatz. Diese und weitere Funktionen wie destroy(), rand(), go() oder onUpdate() haben die Umsetzung sehr vereinfacht und konnten gut in den Code eingefügt werden.

### Dateiaufteilung

    |-src    Ordner für den Sourcecode des Kaboom Projekts
    | |-config  Unterordner für Konfigurationsdateien
    | |-functionalities  Unterordner für alle Klassen mit den Funktionen des Spiels
    | |-scenes  Unterordner für alle Szenen des Spiels
    |-www    Ordner für Assets und die index.html so wie das built js bundle
    | |-favicon  Unterordner für das Favicon
    | |-font     Unterordner für Font-Dateien
    | |-sound    Unterordner für Sound-Dateien
    | |-sprites  Unterordner für Bilddateien und Sprites

Für die Umsetzung des Spiels wurde sich für objektorientierte Programmierung entschieden, um die einzelnen Bereiche des Spiels sauber voneinander abzugrenzen. Die einzelnen Szenen rufen die Klassen auf und nutzen ihre Funktionen. In der Szene “Main” wird das Spiel gestartet. Die 3 Szenen “Start”, “Game” und “Navigation” stellen die drei Ansichten, die dem Spieler zur Verfügung stehen, dar. Insgesamt gibt es vier Klassen in dem Ordner functionalities, die von den Szenen genutzt werden:

- “Snake” für alle die Snake betreffenden Informationen, Elemente und Aktionen
- “InteractionObjects” für Objekte wie Früchte und Hindernisse, die eingespielt werden
- “Collision” für die Detektion von Kollisionen zwischen Objekten
- “Layout” für Elemente wie Texte, Bilder, Buttons und auch das Spielfeld als Tilemap

### Config-File

In der Datei config.json befinden sich alle grundlegenden Größen, die in den jeweiligen Klassen aufgerufen werden können. Damit werden redundante Wertzuweisungen eingespart.

### Umsetzung des Spielfelds

Damit die Snake sich nicht willkürlich in verschiedene Richtungen bewegen kann und die Richtungswechsel sauber in vorgegebenen Zeilen und Spalten stattfinden, wird eine Tilemap als Grundlage des Spielfeldes benutzt. Die Tilemap ermöglicht außerdem die Mauer als Hindernis zu hinterlegen und in der Kollision aufrufbar zu machen. Des Weiteren können die spontan auftauchenden Hindernisse auf dem festen Raster platziert werden, sodass die Snake sie ohne Ausnahme frontal erfassen muss und Versatz vermieden wird.

### Platzieren von Früchten und Hindernissen

Früchte und Hindernisse werden zufällig platziert. Dafür wird die rand() Funktion von Kaboom genutzt, die einen zufälligen Wert für die x-Position und einen für die y-Position aus der Eingabe von zwei zweidimensionalen Vektoren ermittelt. Die Eingabe ist so gewählt, dass Früchte und Hindernisse nicht auf der Mauer platziert werden können. Bei dem größeren Busch kann es jedoch passieren, dass ein Teil auf die Mauer ragt. Die Position wird mit der Funktion floor() des Math-Objekts auf einen glatten Wert gerundet, sodass die Objekte mittig auf den Tiles des Spielfelds platziert werden. Bei den Früchten kommt noch ein weiterer Zufallsgenerator in der Funktion randomFruit() hinzu, der aus dem Früchte Array, welches alle zur verfügung stehenden Sprite-Namen beinhaltet, eins auswählt und an die showFruit() Funktion weiterreicht. Dadurch ist das Spiel sehr dynamisch.

### Bildmaterial

Die Grafiken werden als Pixelgrafiken geladen und in Form von Spritesheets im Projekt genutzt. Die Grafiken basieren auf lizenzfreien Vektorgrafiken von Freepik und sind auf das Projekt angepasst oder selbst erstellt worden. Die Optik soll grafisch orientiert mit reduzierten Details sein und keine Pixeloptik haben.
Das Bildmaterial ist thematisch in verschiedene Dateien unterteilt. Jede Szene hat ihren eigenen Hintergrund und für jede Animation, die gespielt werden kann, gibt es ein eigenes Spritesheet mit dem entsprechenden Bewegungsablauf. Das Dateiformat ist das PNG-Format, welches eine geringe Dateigröße hat und einen transparenten Hintergrund, insbesondere bei den Animationen ermöglicht.
Wichtig bei der Erstellung der Snake Grafik war es, dass die Snaketeile (bis auf den Kopf und den Schwanz) auch spiegelverkehrt einsetzbar sind, damit die Sprites in verschiedenen Ausrichtungen korrekt angezeigt werden.

### Soundmaterial

Die Sounds sind ebenfalls lizenzfrei von Pixabay und sind kurze Geräusche, die dem Spieler verdeutlichen, was gerade im Spiel passiert ist.

## Probleme und Lösungen, die während der Entwicklung auftraten

### Snake Bewegung und Spritesheet

Die erste Idee, die Snake zu bewegen, war mit Hilfe der Kaboom-Funktion “move”. Damit wurde nicht das gewünschte Verhalten erzielt, dass sich die Snake bei Tastendruck um genau 90° in eine andere Richtung dreht und daher wieder verworfen wurde.

Angelehnt an ein Replit-Tutorial, in dem die Bewegung in einer onUpdate() Funktion platziert wurde und einzelne Segmente der Snake in einem Array (snakeBody) dokumentiert werden, hat die Bewegung besser geklappt. In dem Tutorial ist der Array so aufgebaut, dass der Kopf den Index der Array-Länge- 1 hat und das Schwanzteil den Index 0. Die Bewegung wird erreicht, indem ein neues Kopfelement hinzugefügt wird und das Schwanzelement aus dem Array snakeBody entfernt wird. So kann sich die Snake Segment für Segment fortbewegen. Wenn ein neues Segment in der Mitte der Schlange hinzugefügt wird, dann wird der Kopf gelöscht, ein neues Körpersegment angefügt und der Kopf wieder an die letzte Stelle gesetzt. Diese Umsetzung lief zwar gut, führte aber bei der Belegung der Spritesheets zu Umständlichkeiten, da der Aufbau der Schlange nicht intuitiv ist und der Array permanent mit push()- und shift()-Funktionen bearbeitet wird.

Die Schlange wurde daher in der Bewegung nochmal umstrukturiert und bewegt sich nun mit Positionsveränderungen der einzelnen Segmente fort. Im Array snakeBody, der alle Snake-Segmente beinhaltet, hat das Kopfteil nun den Index 0 und das Schwanzteil ist das letzte Element des Arrays. Dafür wurde das Switch Statement aus dem ersten Tutorial, welches die vier Richtungen beinhaltet und die Bewegungsrichtung durch den Kopf vorgegeben wird, angepasst und zwei Arrays hinzugefügt, die jeweils alle x-Positionen und alle y-Positionen beinhalten. In einer Schleife werden die Positionen der Segmente im Array snakeBody jeweils in die Position des darauffolgenden Elements mithilfe der Positionsarrays verändert, wodurch die Bewegung entsteht. Vor jeder neuen Bewegung werden die Positionsarrays geleert und mit den aktuellen Positionen neu belegt.

Mit Hilfe der Schleife können außerdem die Sprites intuitiver zugewiesen werden, was ebenfalls in der gleichen Schleife stattfinden kann. Dafür war ein weiteres Tutorial hilfreich, welches ein Snake Spiel in html und JavaScript erstellt. Es wurde gut veranschaulicht, welche Bedingungen die Positionen der Segmente für welches Sprite erfüllt werden müssen, sodass das Vorgehen gut auf die Umgebung mit Kaboom übertragen werden konnte. Die Sprites können in Kaboom mithilfe von Frame-Zuweisungen geändert werden. Das ist notwendig, wenn die Snake die Richtung wechselt. In der Kaboom-Dokumentation war darüber leider nichts zu finden und die Recherche des Anwendungsfalls hat etwas mehr Zeit gekostet.

### Snake kürzt sich selbst

Dadurch, dass die Segmente so dicht aneinander sind, kann für diesen Fall nicht die onCollide() Funktion von Kaboom verwendet werden, da sich die Schlange sonst bei jeder Bewegung kürzt und nicht mehr länger werden kann. Es musste daher ein Positionsvergleich des Kopfteils, der die Kollision auslöst, und den restlichen Segmenten durchgeführt werden, um das Problem zu lösen.

### Kollision mit benachbarten Tiles

Da die Tiles des Spielfeldes genau aneinandergrenzen, wird bereits eine Kollision ausgelöst, wenn die Snake ein Objekt (Frucht oder Hindernis) noch nicht direkt berührt hat, sondern daran lediglich vorbeigeleitet wurde. Eine Lösung war es, die Snake, die Früchte und die Hindernisse um einen Pixel in der Höhe und der Breite zu verkleinern, damit die Kollisionsfunktionen nicht fehlerhaft ausgelöst werden. Bei der Belegung der Snake mit dem Spritesheet treten dadurch allerdings leichte Pixelfehler zwischen den Segmenten auf.

### wait() Funktion

Die wait() Funktion von Kaboom wirft Fehler, wenn innerhalb der Funktion Attribut-Aufrufe der Klasse mit this gemacht werden. Deshalb wurde weitestgehend auf diese Funktion verzichtet und nur bei dem verzögerten Szenenwechsel am Ende eines Spiels eingesetzt, wenn kein this benötigt wird. Das Superobst hat daher auch keine feste Dauer, sondern das Attribut isSupersnake wird bei einer normalen Frucht wieder auf false gesetzt, anstatt bereits nach 3 Sekunden. Gelöst werden könnte das Problem an dieser Stelle ggf. mit Hilfe eines Timeouts, allerdings würde es zu Überschneidungen der Timeouts kommen, wenn Superobst in kurzen Abständen gefressen wird, was wiederum abgefangen werden müsste. Die Lösung den Superobst-Modus so lange zu behalten, bis neues Obst gefressen wird, ist weniger aufwändig und beeinflusst das Spielerlebnis nur gering.

Wenn die Obstacles verzögert auftauchen, kann ein Timeout das Problem lösen und anstelle der wait() Funktion von Kaboom eingesetzt werden, um weiterhin dem Spieler die Möglichkeit der Orientierung zu bieten.

### Ordnerstruktur im Kaboom-Projekt

Wenn das Projekt mit `npm init Kaboom -- mygame` initialisiert wird, dann wird eine feste Ordnerstruktur vorgegeben, die nicht so einfach angepasst werden kann. Im Deployment zeigte sich das Problem recht früh, dass die index.html die main.js nicht finden konnte, da diese sich in einem anderen Ordner befindet. Gelöst werden kann das Problem mit dem Befehl `npm run build` vor jedem Commit. Dadurch wird eine optimierte main.js in den gleichen Ordner der index.html generiert und das Deployment kann den aktuellen Entwicklungsstand zeigen.

Für das Projekt sollen neben den Sprites auch andere Dateiformate verwendet werden wie ttf-Dateien für die Schriftart oder mp3-Dateien für Sounds. Auch diese Dateien müssen neben den sprites-Ordner in dem übergeordneten www-Ordner abgelegt werden, sonst kann das Projekt die Dateien nicht finden. Selbst wenn sie direkt neben der aufrufenden Datei liegen, wird die Fehlermeldung HTTP 404 ausgelöst. Die strikten Vorgaben lassen das Projekt jedoch gut strukturiert und übersichtlich bleiben.

Rückblickend stehen diese beiden Themen knapp beschrieben in der Readme.md, die in dem initialisierten Projekt mitgeliefert wird. Die Fehlersuche hätte schneller beendet werden können, wenn dort genauer nachgelesen worden wäre.

### Staubwolke statt Kopfschütteln

Durch die onUpdate() Funktion, die die Positionen der Segmente verändert, läuft die Snake bei einer Kollision weiter durch das Hindernis. Die Positionswechsel müssten sofort gestoppt werden. Außerdem müsste das Sprite stark erweitert werden, damit das Kopfschütteln über frame vom Kopf aufgerufen werden kann. Bei den Tests wie das Kopfschütteln in dem Spiel aussieht, hat sich erwiesen, dass das Kopfschütteln nur dezent sichtbar ist und daher kaum einen Mehrwert hat, der den Aufwand gerechtfertigt. Daher wurde sich für die Staubwolke entschieden, die an der Position des Zusammenstoßes auftaucht. Die Snake-Segmente werden mit der destroyAll() Funktion gelöscht und die Snake durchläuft nicht weiterer das Hindernis, während die Animation der Staubwolke abgespielt wird. Durch diese Alternative hat der Spieler ein unmissverständliches Feedback, dass das Spiel beendet ist.

## Zusätzliches Elemente außerhalb des Konzepts

### Font

Für alle Texte wurde eine Font genutzt, die den Schriftstil individualisiert und besser zum Spiel passt. Die abgerundete Schrift passt besser zum Stil der Snake, als der default-Schriftstil. Farblich orientieren sich die Texte ebenfalls an der Snake-Farbigkeit.
* Lilita One - Juan Montoreano - Google Fonts. (o. D.). https://fonts.google.com/specimen/Lilita+One, zugegriffen am 12.01.2024

### Geschwindigkeit

Um dem Spiel noch etwas mehr Spannung zu geben, wird neben dem Einblenden von Hindernissen auch die Geschwindigkeit der Snake erhöht. Beim Auftauchen von Büschen wird die Geschwindigkeit etwas stärker erhöht als bei Maulwürfen, um die Gewichtung der Hindernisse zu verstärken.

## Verbesserungsmöglichkeiten des Spiels

### Richtungswechsel

Betätigt der Spieler die Pfeiltasten zu schnell hintereinander, kann es passieren, dass die Snake sofort die Richtung wechselt und sich um 180° dreht. Da sich die Snake bei einer Kollision des Kopfes mit einem anderen Snaketeil selber kürzt, kann es bei schnelleren Geschwindigkeitseinstellungen und damit schneller hintereinander folgenden Tastenklicks zum Kürzen der gesamten Schlange kommen. Es müsste noch ein Mechanismus implementiert werden, der diese schnelle Richtungsänderung nicht erlaubt.

### Kollisionen mit Objekten auf den Positionen der Snake

Es wird derzeit noch nicht abgefangen, ob sich auf den zufällig ausgewählten Positionen der Früchte und Hindernissen gerade die Snake befindet. So kann ein Hindernis auch mitten auf der Snake platziert werden und das Spiel beendet sich oder man kann zusätzliche Punkte erhalten, falls eine Frucht auf der Snake platziert wird und sofort mit der Snake kollidiert.

### Visuelle Rückmeldung für den Superobst-Modus

Für den Spieler gibt es optisch nicht genug Bestätigung, dass man sich im Modus des Superobstes befindet. Eine visuelle Rückmeldung würde helfen und der Spieler müsste sich nicht merken, ob zuletzt das Superobst oder eine normale Frucht gefressen wurde. Eine Bestätigung per Sound ist jedoch implementiert.

### Darstellung von Fließtexten

Die Darstellung von Fließtexten könnte noch optimiert werden, sodass Texte nicht zeilenweise eingelesen werden müssen, sondern die addDescription Funktion einen langen Text direkt in einen Textblock umwandelt.

### Mögliche weitere Funktionen

Ein Feature, was noch eingebaut werden kann, wäre das Abspeichern des erzielten Punktestands gemeinsam mit dem Spielernamen in einer Highscore-Tabelle. So könnte man seinen Fortschritt erkennen und seine eigenen Bestzahlen versuchen zu toppen, wodurch das Spiel noch interessanter werden könnte. Außerdem wäre es möglich, mehr Schwierigkeitsgrade zu implementieren. Beispielsweise könnten sich Hindernisse oder Früchte bewegen, sodass das Ausweichen oder das Erhalten von Punkten schwieriger wird. Eine weitere Idee wäre das Implementieren von "Löchern", die der Snake ermöglichen den Ort auf dem Spielfeld zu wechseln. Die Architektur des Spiels ließe solche Funktionserweiterungen problemlos zu.

## Rückblick auf den Entwicklungsprozess:

In Zukunft wäre eine frühere Datei-Aufteilung sinnvoller, als ich sie in diesem Projekt vorgenommen habe. Dafür ist jedoch aus meiner Sicht die Kaboom Dokumentation gerade für Beginner in dem Framework nicht unterstützend genug und die Umstrukturierung hat daher eine gewisse Zeit in Anspruch genommen, den richtigen Ansatz zu finden Kaboom sinnvoll zu importieren und die Dateien wieder auseinander zu teilen.

</details>
</br></br>
Elisabeth Edert,
Rich-Media-Anwendungen WS 23/24, 21. Januar 2024
</br></br>

* Replit @ritza. (2021, 13. Oktober). Snake-Kaboom. https://docs.replit.com/tutorials/Kaboom/build-snake-with-Kaboom, zugegriffen am 16.12.2024
* Rembound. (2020, 17. Februar). Creating a snake game tutorial with HTML5. https://rembound.com/articles/creating-a-snake-game-tutorial-with-html5, zugegriffen am 13.01.2024
