flexbox 1
<div class="parent">
	<div class="child">div1</div>
	<div class="child">div2</div>
	<div class="child">div3</div>
	<div class="child">div4</div>
	<!-- <div class="child">div5</div>
	<div class="child">div6</div>
	<div class="child">div7</div>
	<div class="child">div8</div> -->
</div>

<!-- DEFAULT VALUES
FLEX-DIRECTION: ROW                 			(column, row-reverse, column-reverse
JUSTIFY-CONTENT: FLEX-START;        			(center, flex-start, flex-end, etc)
ALIGN-ITEMS: STRETCH;               			(center, flex-start, flex-end, etc)
ALIGN-SELF: STRETCH (inherit from align-items) 	(center, flex-start, flex-end, etc)
ALIGN-CONTENT: STRETCH;             			(center, flex-start, flex-end, etc)
FLEX-WRAP: NOWRAP;                 				(wrap-reverse)

FLEX-GROW: 0;									(any numeric value: 0, 1, 2, etc)
FLEX-SHRINK: 1;									(any numeric value: 0, 1, 2, etc)
FLEX-BASIS: auto;								(any value that width, height supports)
(Note: `auto` in above line means to fallback to width (fxd="row") or height (fxd="column").
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
	div {
		border: 1px solid orange;
		padding: 1px;
		/* Note: Never give margins to children as it causes issues
			for e.g, when you have flex-basis: 50% on child then the
			child do not act such that two items appear in main axis.  */
		/* margin: 1px; */

		/* width: 150px; */

		/* In flex children when `flex-direction: row` the
		  	`flex-basis` takes precedence over `width` . */
		/* flex-basis: 50%; */
	}

	:nth-of-type(3) {
		color: red;

		/* max-width: 30px; */
		flex-basis: 100;
		min-width: 80px;
	}
</style>
