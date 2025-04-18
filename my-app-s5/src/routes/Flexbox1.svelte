flexbox 1
<div class="parent">
	<div class="child">div1</div>
	<div class="child">div2</div>
	<div class="child">div3</div>
	<div class="child">div4</div>
	<div class="child">div5</div>
	<div class="child">div6</div>
	<div class="child">div7</div>
	<div class="child">div8</div>
</div>

<!-- DEFAULT VALUES
FLEX-DIRECTION: ROW                 			(column, row-reverse, column-reverse
JUSTIFY-CONTENT: FLEX-START;        			(center, flex-start, flex-end, etc)
ALIGN-ITEMS: STRETCH;               			(center, flex-start, flex-end, etc)
ALIGN-SELF: STRETCH (inherit from align-items) 	(center, flex-start, flex-end, etc)
ALIGN-CONTENT: STRETCH;             			(center, flex-start, flex-end, etc)
FLEX-WRAP: NOWRAP;                 				(wrap-reverse)
-->
<style>
	.parent {
		width: 100%;
		height: 150px;
		border: 1px solid grey;
		padding: 1px;

		display: flex;
		flex-direction: row;
		/* justify-content: flex-start; */
		/* align-items: center; */

		/* flex-wrap: wrap; */
		/* align-content: flex-start; */
	}
	.child {
		border: 1px solid orange;
		padding: 1px;
		margin: 1px;
		width: 150px;
	}
</style>
