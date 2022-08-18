import React from 'react';
import PropTypes from 'prop-types';

import { Task } from './Task';

export const TaskList = ({ loading, tasks, onPinTask, onArchiveTask }) => {
	const events = {
		onPinTask,
		onArchiveTask,
	};

	const LoadingRow = (
		<div className='loading-item'>
			<span className='glow-checkbox' />
			<span className='glow-text'>
				<span>Loading</span> <span>cool</span> <span>state</span>
			</span>
		</div>
	);

	if (loading) {
		return (
			<div className='list-items' data-testid='loading' key={'loading'}>
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
				{LoadingRow}
			</div>
		);
	}

	if (tasks.length === 0) {
		return (
			<div className='list-items' key={'empty'} data-testid='empty'>
				<div className='wrapper-message'>
					<span className='icon-check' />
					<p className='title-message'>You have no tasks</p>
					<p className='subtitle-message'>Sit back and relax</p>
				</div>
			</div>
		);
	}

	const tasksOrder = [
		...tasks.filter((t) => t.state === 'TASK_PINNED'),
		...tasks.filter((t) => t.state !== 'TASK_PINNED'),
	];

	return (
		<div className='list-items'>
			{tasksOrder.map((task) => (
				<Task key={task.key} task={task} {...events} />
			))}
		</div>
	);
};

TaskList.propTypes = {
	loading: PropTypes.bool,
	task: PropTypes.arrayOf(Task.propTypes.task).isRequired,
	onPinTask: PropTypes.func,
	onArchiveTask: PropTypes.func,
};

TaskList.defaultProps = {
	loading: false,
};
