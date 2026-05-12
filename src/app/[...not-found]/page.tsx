'use client'

import { Container } from '@/components/Container'
import { Heading } from '@/components/Heading'
import { Text } from '@/components/Text'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <main>
      <Container>
        <div className="py-24 text-center">
          <Heading level={1} className="text-6xl mb-4 font-bold">
            404
          </Heading>
          <Heading level={2} className="mb-4">
            Page Not Found
          </Heading>
          <Text className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </Text>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
            <Link href="/shop">
              <Button variant="secondary">Browse Shop</Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}
