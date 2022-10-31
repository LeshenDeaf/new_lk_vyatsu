import React from 'react';
import { ProgramsApiResponse } from '../../../../models/api/edu/programsTypes';
import ProgramsLegend from './ProgramsLegend';
import ProgramsTable from './ProgramsTable';

interface Props {
	programs: ProgramsApiResponse;
}

export default function Program({programs}: Props) {
  
	return (
		<>
			<ProgramsLegend colors={programs.colors} />
			<ProgramsTable programs={programs} />
		</>
	);
}
