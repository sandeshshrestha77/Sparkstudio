export default function EditUserLoading() {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-9 w-32 bg-muted rounded animate-pulse"></div>
            <div>
              <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2"></div>
              <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="h-96 bg-background border rounded-lg animate-pulse mb-6"></div>
          <div className="h-32 bg-background border rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
