import React from 'react';

export default function BucketTeethLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}