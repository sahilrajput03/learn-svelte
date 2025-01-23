<a href="upi://pay?pa=Q333412475@ybl&pn=PhonePeMerchant&mc=0000&mode=02&purpose=00">
	Pay Vijay (all params)
</a>

<a href="upi://pay?pa=Q333412475@ybl">Pay Vijay (2 - no params)</a>

<!-- from library - "..." -->
<a href="upi://pay?pa=prem.mohapatra@oksbi&pn=PNLBot&am=1&tn=MonthlyFees&tr=uuid">
	pay with all params</a
>

<a href="upi://pay?pa=Q333412475@ybl&pn=PhonePeMerchant&mc=5812&tn=note&am=1&cu=INR">
	Pay (ChatGPT example, mc=5812 (eating places & restaurants), without `tid` and `tr`)
</a>

<a
	href="upi://pay?pa=Q333412475@ybl&pn=PhonePeMerchant&mc=5812&tid=uniqueTransactionID&tr=transactionRefId&tn=note&am=1&cu=INR"
>
	Pay (ChatGPT example, mc=5812 (eating places & restaurants))
</a>

<!-- 
Params:
- pa = payee address
- pn = payeename
- mc = merchant code (merchant category code)
- ? tid = transaction id
- ? tr = transaction reference id
- tn = transaction note
- am = amount
- cu = currency

-->

<hr />

<p>Non-merchant account -</p>

<a href="upi://pay?pa=8360267243@ptyes&pn=John%20Doe&am=100&cu=INR">Pay Sahil</a>

<style>
	hr,
	a {
		display: block;
		margin-top: 20px;
		color: blue;
	}
</style>
