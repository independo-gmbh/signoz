import './Explorer.styles.scss';

import { FilterOutlined } from '@ant-design/icons';
import * as Sentry from '@sentry/react';
import { Switch, Typography } from 'antd';
import logEvent from 'api/common/logEvent';
import cx from 'classnames';
import QuickFilters from 'components/QuickFilters/QuickFilters';
import { QuickFiltersSource } from 'components/QuickFilters/types';
import ErrorBoundaryFallback from 'pages/ErrorBoundaryFallback/ErrorBoundaryFallback';
import { useEffect } from 'react';

import { useApiMonitoringParams } from '../queryParams';
import { ApiMonitoringQuickFiltersConfig } from '../utils';
import DomainList from './Domains/DomainList';

function Explorer(): JSX.Element {
	const [params, setParams] = useApiMonitoringParams();
	const showIP = params.showIP ?? true;

	useEffect(() => {
		logEvent('API Monitoring: Landing page visited', {});
	}, []);

	return (
		<Sentry.ErrorBoundary fallback={<ErrorBoundaryFallback />}>
			<div className={cx('api-monitoring-page', 'filter-visible')}>
				<section className="api-quick-filter-left-section">
					<div className="api-quick-filters-header">
						<FilterOutlined />
						<Typography.Text>Filters</Typography.Text>
					</div>

					<div className="api-quick-filters-header">
						<Typography.Text>Show IP addresses</Typography.Text>
						<Switch
							size="small"
							style={{ marginLeft: 'auto' }}
							checked={showIP ?? true}
							onClick={(): void => {
								logEvent('API Monitoring: Show IP addresses clicked', {
									showIP: !(showIP ?? true),
								});
								setParams({ showIP });
							}}
						/>
					</div>

					<QuickFilters
						source={QuickFiltersSource.API_MONITORING}
						config={ApiMonitoringQuickFiltersConfig}
						handleFilterVisibilityChange={(): void => {}}
					/>
				</section>
				<DomainList />
			</div>
		</Sentry.ErrorBoundary>
	);
}

export default Explorer;
