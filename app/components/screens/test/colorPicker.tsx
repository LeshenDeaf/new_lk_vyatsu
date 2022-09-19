import React, { FC, useState } from 'react';

type RGB = {
	red: number;
	green: number;
	blue: number;
};

const colorPicker: FC = () => {
	const [rgb, setRbg] = useState<RGB>({ red: 0, green: 0, blue: 0 } as RGB);

	return (
		<div className="flex">
			<div>
				<div>
					<input
						type="number"
						value={rgb.red}
						onChange={(e) =>
							setRbg(
								(prev: RGB) => ({ ...prev, red: e.target.valueAsNumber } as RGB)
							)
						}
					/>
					<input
						className="w-50"
						type="range"
						min={0}
						max={255}
						value={rgb.red}
						onChange={(e) =>
							setRbg((prev: RGB) => ({ ...prev, red: e.target.valueAsNumber }))
						}
					/>
					<div
						className="h-10 w-50"
						style={{
							background: `linear-gradient(90deg, rgba(0,${rgb.green},${rgb.blue},1) 0%, rgba(255,${rgb.green},${rgb.blue},1) 100%)`,
						}}
					></div>
				</div>
				<div>
					<input
						type="number"
						value={rgb.green}
						onChange={(e) =>
							setRbg((prev: RGB) => ({
								...prev,
								green: e.target.valueAsNumber,
							}))
						}
					/>
					<input
						className="w-50"
						type="range"
						min={0}
						max={255}
						value={rgb.green}
						onChange={(e) =>
							setRbg((prev: RGB) => ({
								...prev,
								green: e.target.valueAsNumber,
							}))
						}
					/>
					<div
						className="h-10 w-50"
						style={{
							background: `linear-gradient(90deg, rgba(${rgb.red},0,${rgb.blue},1) 0%, rgba(${rgb.red},255,${rgb.blue},1) 100%)`,
						}}
					></div>
				</div>
				<div>
					<input
						type="number"
						value={rgb.blue}
						onChange={(e) =>
							setRbg((prev: RGB) => ({ ...prev, blue: e.target.valueAsNumber }))
						}
					/>
					<input
						className="w-50"
						type="range"
						min={0}
						max={255}
						value={rgb.blue}
						onChange={(e) =>
							setRbg((prev: RGB) => ({ ...prev, blue: e.target.valueAsNumber }))
						}
					/>
					<div
						className="h-10 w-50"
						style={{
							background: `linear-gradient(90deg, rgba(${rgb.red},${rgb.green},0,1) 0%, rgba(${rgb.red},${rgb.green},255,1) 100%)`,
						}}
					></div>
				</div>
			</div>
			<div
				className="w-[388px] h-[200px] p-1 border border-vyatsu-darkblue rounded-[10px] ml-2 cursor-pointer"
				style={{
					backgroundColor: `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`,
				}}
				onClick={() =>
					navigator.clipboard.writeText(
						`rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`
					)
				}
			></div>
		</div>
	);
};

export default colorPicker;
