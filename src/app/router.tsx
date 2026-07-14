import { createBrowserRouter } from 'react-router-dom';
import { SearchPage } from '../pages/SearchPage/SearchPage';
import { RecommendationPage } from '../pages/RecommendationPage/RecommendationPage';
import { ReviewPage } from '../pages/ReviewPage/ReviewPage';
export const router = createBrowserRouter([{ path: '/', element: <SearchPage /> }, { path: '/recommendations', element: <RecommendationPage /> }, { path: '/review', element: <ReviewPage /> }]);
