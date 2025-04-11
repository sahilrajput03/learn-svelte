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
flex-direction: row                 Other values: column, row-reverse, column-reverse
justify-content: flex-start;        Other values: center, flex-end, space-betwen, space-around, etc
align-items: stretch;               Other values: center, flex-end, space-betwen, space-around, etc
align-content: stretch;             Other values: 

 flex-wrap: nowrap;                 Other values: wrap-reverse
 align-content: stretch;
-->
<style>
	.parent {
		width: 100%;
		height: 150px;
		border: 1px solid grey;
		padding: 1px;

		display: flex;
		/* flex-direction: row; */
		/* justify-content: flex-start; */
		/* align-items: flex-start; */

		/* flex-wrap: wrap; */
		/* align-content: flex-start; */
	}
	div {
		border: 1px solid orange;
		padding: 1px;
		margin: 1px;
		width: 150px;
	}
</style>
