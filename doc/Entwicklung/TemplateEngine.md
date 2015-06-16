#Template Engine
##Allgemeines
Unsere Templateengine basiert auf sogenannten templateDateien kurt tpl.
Diese Dateien werden dynamisch vom PHP geladen und mit Inhalten verknüpft. 

##Neues Template
Ein neues Template muss im Ordner templates/ abgelegt werden und die Dateiendung .tpl besitzen.

Hier ein Beispiel für eine solche Templatedatei:
'''template
{* Header einbinden *}
{include file="header.tpl"}
 <h1>Hier folgt das Hub</h1>

{* Footer einbinden *}
{include file="footer.tpl"}
'''
##Kommentare

Kommentare werden in einem bestimmten Stil gekennzeichnet dadurch werden sie später nicht auf der Homepage auftauchen:
'''template
{* Mein Kommentar *}
'''
##Includes

Um andere tpl Dateien zu inkludieren müssen die Includes wie folgt definiert werden:
'''template
{include file="hallo.tpl"}
'''
##Platzhalter
Um werte an die Templates zu übergeben kann folgender tag verwendet werden:
'''template
{$website_title}
'''
Wie diese befüllt werden findet sich im Bereich "Nutzen der Templateengine"

##Templateengine einsetzen
'''template
include("Template.class.php");

// Das Template laden
$tpl = new Template();
$tpl->load("index.tpl");

// Platzhalter ersetzen
$tpl->assign( "website_title", "MyHomepage" );

$tpl->display(); 
'''
