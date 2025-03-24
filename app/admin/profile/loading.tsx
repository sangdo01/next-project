export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    </div>
  );
}
