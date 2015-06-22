{* Header einbinden *}
{include file="header.tpl"}

{include file="projectExplorer.tpl"}
<div class="mainArea">
	<form>
		<textarea id="editor" class="code">
		
		</textarea>
	</form>
</div>

  <script src="/bower_components/codemirror/lib/codemirror.js"></script>
  <script src="/bower_components/codemirror/addon/hint/show-hint.js"></script>
  <script src="/bower_components/codemirror/addon/hint/javascript-hint.js"></script>
  <script src="/bower_components/codemirror/mode/javascript/javascript.js"></script>
<script src="/js/editor.js"></script>
<script>
  initEditor("editor");
</script>
{* Footer einbinden *}
{include file="footer.tpl"}