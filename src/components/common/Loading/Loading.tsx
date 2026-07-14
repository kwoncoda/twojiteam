export function Loading({ message = '불러오는 중입니다.' }: { message?: string }) { return <div className="loading" role="status">{message}</div>; }
