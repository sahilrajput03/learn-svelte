<!-- Source: https://github.com/tailwindlabs/tailwindcss-forms/blob/main/kitchen-sink.html -->

<div class="px-6 text-gray-900 antialiased">
	<div class="mx-auto max-w-xl py-12 md:max-w-4xl">
		<h2 class="text-2xl font-bold">Reset styles</h2>
		<p class="mt-2 text-lg text-gray-500">These are form elements this plugin styles by default.</p>
		<div class="mt-8 grid grid-cols-1 items-start gap-6 md:grid-cols-2">
			<div class="grid grid-cols-1 gap-6">
				<label class="block">
					<span class="text-gray-700">Input (text)</span>
					<input type="text" class="form-input mt-1 block w-full" placeholder="john@example.com" />
				</label>
				<label class="block">
					<span class="text-gray-700">Input (email)</span>
					<input type="email" class="form-input mt-1 block w-full" placeholder="john@example.com" />
				</label>
				<label class="block">
					<span class="text-gray-700">Input (email, multiple)</span>
					<input
						type="email"
						multiple
						class="form-input mt-1 block w-full"
						placeholder="john@example.com"
					/>
				</label>
				<label class="block">
					<span class="text-gray-700">Input (password)</span>
					<input
						type="password"
						class="form-input mt-1 block w-full"
						placeholder="john@example.com"
					/>
				</label>
				<label class="block">
					<span class="text-gray-700">Input (date)</span>
					<input type="date" class="form-input mt-1 block w-full" />
				</label>
				<label class="block">
					<span class="text-gray-700">Input (datetime-local)</span>
					<input type="datetime-local" class="form-input mt-1 block w-full" />
				</label>
				<label class="block">
					<span class="text-gray-700">Input (month)</span>
					<input type="month" class="form-input mt-1 block w-full" />
				</label>
				<label class="block">
					<span class="text-gray-700">Input (number)</span>
					<input type="number" class="form-input mt-1 block w-full" />
				</label>
				<label class="block">
					<span class="text-gray-700">Input (search)</span>
					<input type="search" class="form-input mt-1 block w-full" />
				</label>
				<label class="block">
					<span class="text-gray-700">Input (time)</span>
					<input type="time" class="form-input mt-1 block w-full" />
				</label>
				<label class="block">
					<span class="text-gray-700">Input (week)</span>
					<input type="week" class="form-input mt-1 block w-full" />
				</label>
			</div>
			<div class="grid grid-cols-1 gap-6">
				<label class="block">
					<span class="text-gray-700">Input (tel)</span>
					<input
						type="tel"
						multiple
						class="form-input mt-1 block w-full"
						placeholder="john@example.com"
					/>
				</label>
				<label class="block">
					<span class="text-gray-700">Input (url)</span>
					<input
						type="url"
						multiple
						class="form-input mt-1 block w-full"
						placeholder="john@example.com"
					/>
				</label>
				<label class="block">
					<span class="text-gray-700">Select</span>
					<select class="form-select mt-1 block w-full">
						<option>Option 1</option>
						<option>Option 2</option>
					</select>
				</label>
				<label class="block">
					<span class="text-gray-700">Select (single, with size)</span>
					<select class="form-select mt-1 block w-full" size="3">
						<option>Option 1</option>
						<option>Option 2</option>
						<option>Option 3</option>
						<option>Option 4</option>
						<option>Option 5</option>
					</select>
				</label>
				<label class="block">
					<span class="text-gray-700">Select (multiple)</span>
					<select class="form-multiselect mt-1 block w-full" multiple>
						<option>Option 1</option>
						<option>Option 2</option>
						<option>Option 3</option>
						<option>Option 4</option>
						<option>Option 5</option>
					</select>
				</label>
				<label class="block">
					<span class="text-gray-700">Select (multiple, with size)</span>
					<select class="form-multiselect mt-1 block w-full" multiple size="3">
						<option>Option 1</option>
						<option>Option 2</option>
						<option>Option 3</option>
						<option>Option 4</option>
						<option>Option 5</option>
					</select>
				</label>
				<label class="block">
					<span class="text-gray-700">Textarea</span>
					<textarea
						class="form-textarea mt-1 block h-24 w-full"
						rows="3"
						placeholder="Enter some long form content."
					></textarea>
				</label>
				<fieldset class="block">
					<legend class="text-gray-700">Checkboxes</legend>
					<div class="mt-2">
						<div>
							<label class="inline-flex items-center">
								<input class="form-checkbox" type="checkbox" checked />
								<span class="ml-2">Option 1</span>
							</label>
						</div>
						<div>
							<label class="inline-flex items-center">
								<input class="form-checkbox" type="checkbox" />
								<span class="ml-2">Option 2</span>
							</label>
						</div>
						<div>
							<label class="inline-flex items-center">
								<input class="form-checkbox" type="checkbox" />
								<span class="ml-2">Option 3</span>
							</label>
						</div>
					</div>
				</fieldset>
				<fieldset class="block">
					<legend class="text-gray-700">Radio Buttons</legend>
					<div class="mt-2">
						<div>
							<label class="inline-flex items-center">
								<input class="form-radio" type="radio" checked name="radio-direct" value="1" />
								<span class="ml-2">Option 1</span>
							</label>
						</div>
						<div>
							<label class="inline-flex items-center">
								<input class="form-radio" type="radio" name="radio-direct" value="2" />
								<span class="ml-2">Option 2</span>
							</label>
						</div>
						<div>
							<label class="inline-flex items-center">
								<input class="form-radio" type="radio" name="radio-direct" value="3" />
								<span class="ml-2">Option 3</span>
							</label>
						</div>
					</div>
				</fieldset>
			</div>
		</div>
	</div>
	<div class="mx-auto max-w-4xl py-12">
		<h2 class="text-2xl font-bold">Untouched</h2>
		<p class="mt-2 text-lg text-gray-500">
			These are form elements we don't handle (yet?), but we use this to make sure we haven't
			accidentally styled them by mistake.
		</p>
		<div class="mt-8 grid grid-cols-2 items-start gap-6">
			<div class="grid grid-cols-1 gap-6">
				<label class="block">
					<span class="text-gray-700">Input (range)</span>
					<input type="range" class="mt-1 block w-full" />
				</label>
				<label class="block">
					<span class="text-gray-700">Input (color)</span>
					<input type="color" class="mt-1 block w-full" />
				</label>
				<label class="block">
					<span class="text-gray-700">Input (file)</span>
					<input type="file" class="mt-1 block w-full" />
				</label>
				<label class="block">
					<span class="text-gray-700">Input (file, multiple)</span>
					<input type="file" multiple class="mt-1 block w-full" />
				</label>
			</div>
		</div>
	</div>
</div>
