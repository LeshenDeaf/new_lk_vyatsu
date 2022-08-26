import React, { memo } from 'react';
import BirdLogo from '../../shared/BirdLogo';

export default memo(function ProgramsLegend() {
	return (
		<>
			<div className="font-[500] text-[24px] mb-[15px]">
				Текущий учебный план
			</div>
			<div className="flex flex-col">
				<div className="flex items-center my-[10px]">
					<BirdLogo color="#C0E2EF" className="mr-[20px]" />

					<div>Дисциплины формирующие общепрофессинальные компетенции</div>
				</div>
				<div className="flex items-center my-[10px]">
					<BirdLogo color="#FFF8B6" className="mr-[20px]" />

					<div>Дисциплины формирующие общие (универсальные) компетенции</div>
				</div>
				<div className="flex items-center my-[10px]">
					<BirdLogo color="#E9BBFF" className="mr-[20px]" />

					<div>Дисциплины формирующие факультативные компетенции</div>
				</div>
				<div className="flex items-center my-[10px]">
					<BirdLogo color="#C4EAAB" className="mr-[20px]" />

					<div>Дисциплины формирующие профессинальные компетенции</div>
				</div>
			</div>
			<div className="font-[400] mt-[10px]">
				<span className="font-[600]">
					Зачетная еденица трудоемкости (ЗЕТ) -
				</span>{' '}
				единица трудоемкости учебной работы и других мероприятий в рамках
				образовательной программы
			</div>
		</>
	);
});
