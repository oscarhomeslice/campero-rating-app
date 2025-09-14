# InsForge Schema Documentation

This document outlines the InsForge schemas that will be used when the backend is integrated with InsForge.

## User Schema

```typescript
import { defineModel, text, email, boolean, json } from '@insforge/core';

export const User = defineModel('user', {
  username: text(),
  email: email(),
  isAdmin: boolean().default(false),
  progress: json().optional()
});
```

## EventState Schema

```typescript
import { defineModel, int, datetime } from '@insforge/core';

export const EventState = defineModel('eventState', {
  currentDay: int(),
  startDate: datetime(),
  endDate: datetime()
});
```

## CamperoRating Schema

```typescript
import { defineModel, text, int, object, datetime } from '@insforge/core';

export const CamperoRating = defineModel('camperoRating', {
  userId: text(),
  camperoId: text(),
  scores: object({
    taste: int(),
    texture: int(),
    ingredients: int(),
    presentation: int(),
    bonus: int().optional()
  }),
  comment: text().optional(),
  day: int(),
  timestamp: datetime()
});
```

## RestaurantRating Schema

```typescript
import { defineModel, text, int, datetime } from '@insforge/core';

export const RestaurantRating = defineModel('restaurantRating', {
  userId: text(),
  restaurantId: text(),
  rating: int(),
  comment: text().optional(),
  day: int(),
  timestamp: datetime()
});
```

## Usage

These schemas will be used to:
1. Store user information with admin role management
2. Manage competition event state and timing
3. Store campero ratings with multi-dimensional scoring
4. Store restaurant ratings with simple 1-5 star system
5. Track user progress and prevent duplicate ratings
6. Enable real-time leaderboards and analytics
