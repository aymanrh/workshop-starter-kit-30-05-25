import { describe, it, expect } from 'vitest'
import { canTransition, getValidTransitions } from '@/lib/lifecycle'

describe('canTransition', () => {
  it('active can transition to waiting', () => {
    expect(canTransition('active', 'waiting')).toBe(true)
  })
  it('active can transition to blocked', () => {
    expect(canTransition('active', 'blocked')).toBe(true)
  })
  it('active can transition to closed', () => {
    expect(canTransition('active', 'closed')).toBe(true)
  })
  it('active can transition to cancelled', () => {
    expect(canTransition('active', 'cancelled')).toBe(true)
  })
  it('active cannot transition to itself', () => {
    expect(canTransition('active', 'active')).toBe(false)
  })
  it('closed is terminal — cannot transition to active', () => {
    expect(canTransition('closed', 'active')).toBe(false)
  })
  it('closed is terminal — cannot transition to waiting', () => {
    expect(canTransition('closed', 'waiting')).toBe(false)
  })
  it('cancelled is terminal — cannot transition to active', () => {
    expect(canTransition('cancelled', 'active')).toBe(false)
  })
  it('waiting can transition to blocked', () => {
    expect(canTransition('waiting', 'blocked')).toBe(true)
  })
  it('blocked can transition to active', () => {
    expect(canTransition('blocked', 'active')).toBe(true)
  })
})

describe('getValidTransitions', () => {
  it('returns 4 transitions for active', () => {
    const t = getValidTransitions('active')
    expect(t).toContain('waiting')
    expect(t).toContain('blocked')
    expect(t).toContain('closed')
    expect(t).toContain('cancelled')
    expect(t).not.toContain('active')
    expect(t).toHaveLength(4)
  })
  it('returns empty array for closed', () => {
    expect(getValidTransitions('closed')).toHaveLength(0)
  })
  it('returns empty array for cancelled', () => {
    expect(getValidTransitions('cancelled')).toHaveLength(0)
  })
})
