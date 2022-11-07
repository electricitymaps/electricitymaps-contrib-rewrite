import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import ZoneDetails from './Zone/ZoneDetails';

function ValidZoneIdGuardWrapper({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { zoneId } = useParams();

  if (!zoneId) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function LeftPanel(): JSX.Element {
  return (
    <div className="absolute flex h-full w-full bg-zinc-200 shadow-lg sm:w-4/12">
      <Routes>
        <Route path="/" element={<p>Ranking Panel</p>} />
        <Route
          path="/zone/:zoneId"
          element={
            <ValidZoneIdGuardWrapper>
              <ZoneDetails />
            </ValidZoneIdGuardWrapper>
          }
        />
        {/* Alternative: add /map here and have a NotFound component for anything else*/}
        <Route path="*" element={<p>Ranking Panel</p>} />
      </Routes>
    </div>
  );
}
