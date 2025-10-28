# Deployment Configuration Guide

## Overview

This document outlines the deployment configuration for the Praviel website, including all services, environment variables, and deployment steps.

## Infrastructure Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         PRAVIEL.COM                          │
│                    (Cloudflare Workers)                      │
│                  Next.js 16 App + Marketing                  │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   │ API Calls
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                      API.PRAVIEL.COM                         │
│                   (Railway + FastAPI)                        │
│                   Backend API Service                        │
└──────────────────┬──────────────────────────────────────────┘
                   │
      ┌────────────┼────────────┬──────────────────┐
      ▼            ▼            ▼                  ▼
┌──────────┐ ┌──────────┐ ┌──────────┐      ┌──────────┐
│  Neon    │ │  Redis   │ │ Resend   │      │  AI APIs │
│ Postgres │ │ Railway  │ │  Email   │      │ (OpenAI, │
│  Azure   │ │          │ │          │      │Anthropic)│
└──────────┘ └──────────┘ └──────────┘      └──────────┘
```

## Services Configuration

### 1. Cloudflare Workers (Frontend - praviel.com)

**Deployment Command:**
```bash
pnpm deploy
```

**Configuration File:** `wrangler.jsonc`

**Public Environment Variables (in wrangler.jsonc):**
- `NEXT_PUBLIC_STACK_PROJECT_ID` - Stack Auth project ID
- `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` - Stack Auth public key
- `NEXT_PUBLIC_APP_ORIGIN` - https://praviel.com
- `NEXT_PUBLIC_API_BASE` - https://api.praviel.com
- `EMAIL_FROM_ADDRESS` - noreply@praviel.com
- `EMAIL_FROM_NAME` - PRAVIEL
- `EMAIL_PROVIDER` - resend

**Secrets (set via wrangler CLI):**
```bash
# Required secrets
pnpm wrangler secret put STACK_SECRET_SERVER_KEY
pnpm wrangler secret put DATABASE_URL
pnpm wrangler secret put REDIS_URL
pnpm wrangler secret put RESEND_API_KEY

# Optional secrets (if using AI features)
pnpm wrangler secret put OPENAI_API_KEY
pnpm wrangler secret put ANTHROPIC_API_KEY
pnpm wrangler secret put GOOGLE_API_KEY
```

**Route:** `praviel.com/*`

**Region:** Global (Cloudflare Edge Network)

---

### 2. Railway (Backend API - api.praviel.com)

**GitHub Repository:** `antonsoo/praviel`
**Branch:** `main`
**Deployment:** Automatic on push to main

**Environment Variables (set in Railway dashboard):**

See Railway project `CONSTRVCTIO-EDITIONIS` for complete list including:
- Database connections
- Redis URLs
- AI API keys
- Email configuration
- JWT secrets
- Encryption keys

**Public URL:** `praviel-production.up.railway.app`
**Custom Domain:** `api.praviel.com` (via Cloudflare DNS CNAME)

**Health Check Endpoint:** `/health`

---

### 3. Neon Postgres (Database)

**Project:** `praviel` (ID: `dry-river-38792231`)
**Cloud Provider:** Azure
**Region:** East US 2 (Virginia)
**Postgres Version:** 18

**Branches:**

#### Production Branch
- **Name:** `production` (DEFAULT)
- **Branch ID:** `br-withered-poetry-a8s94qgy`
- **Compute:** `ep-small-truth-a82ceowt`
- **Connection String:**
  ```
  postgresql://neondb_owner:***@ep-small-truth-a82ceowt-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
  ```

#### Development Branch
- **Name:** `development`
- **Branch ID:** `br-billowing-bar-a8jkifgn`
- **Parent:** `production LSN 0/1A7E1C0`
- **Compute:** `ep-blue-cloud-a8nvyro1`
- **Connection String:**
  ```
  postgresql://neondb_owner:***@ep-blue-cloud-a8nvyro1-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
  ```

**GitHub Integration:** Enabled (connected to `antonsoo/praviel`)

**Extensions Enabled:**
- `vector` (for embeddings/AI features)

---

### 4. Railway Redis

**Project:** `MINISTER-REDIS`
**Project ID:** `babc45d4-8e97-4ac9-aa0b-03083bb05b6e`
**Redis Version:** 8.2.2

**URLs:**

- **Public URL** (for external access):
  ```
  redis://default:***@yamanote.proxy.rlwy.net:12298
  ```

- **Private Network URL** (for Railway services):
  ```
  redis://default:***@redis.railway.internal:6379
  ```

**Configuration:**
- Persistence: Enabled (save every 60 seconds if at least 1 key changed)
- Volume mount: `/data`
- Restart policy: On Failure (max 10 retries)

---

### 5. Resend (Email Service)

**Domain:** `praviel.com`
**Region:** `us-east-1` (North Virginia)
**Status:** Verified

**DNS Records (configured in Cloudflare):**

1. **Domain Verification (TXT)**
   ```
   Name: resend._domainkey
   Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDT6Q6gAu5/...
   ```

2. **Send MX Record**
   ```
   Name: send
   Type: MX
   Priority: 10
   Value: feedback-smtp.us-east-1.amazonses.com
   ```

3. **SPF Record (TXT)**
   ```
   Name: send
   Value: v=spf1 include:amazonses.com ~all
   ```

4. **DMARC Record (TXT)**
   ```
   Name: _dmarc
   Value: v=DMARC1; p=none;
   ```

**Configuration:**
- Click Tracking: OFF
- Open Tracking: OFF
- TLS: Opportunistic

---

### 6. Stack Auth (Authentication)

**Project ID:** `5c4f0ecc-f06f-4947-a471-36501ce65909`

**JWKS URL:**
```
https://api.stack-auth.com/api/v1/projects/5c4f0ecc-f06f-4947-a471-36501ce65909/.well-known/jwks.json
```

**OAuth Providers:**
- GitHub (Shared keys)
- Google (Shared keys)
- Microsoft (Shared keys)

**Email Server:** Shared (sender: `noreply@stackframe.co`)

**Keys:**
- Publishable Client Key: `pck_zqxdcens9atbf7jgmx3m5pj5e6146aygtr5j4ezetrwhg` (PUBLIC)
- Secret Server Key: `ssk_***` (SECRET - set in environment)

---

## DNS Configuration (Cloudflare)

**Domain:** `praviel.com`

**Key Records:**

1. **Frontend (Cloudflare Workers)**
   - Handled directly by Cloudflare Workers route

2. **API Backend (Railway)**
   ```
   Type: CNAME
   Name: api
   Value: praviel-production.up.railway.app
   Proxy: Enabled (Orange cloud)
   ```

3. **Email (Resend/Cloudflare)**
   - See Resend section above for complete DNS records
   - MX records for Cloudflare Email Routing
   - SPF, DKIM, DMARC records configured

4. **MTA-STS**
   ```
   Type: CNAME
   Name: mta-sts
   Value: mta-sts.mx.cloudflare.net
   ```

---

## Environment Variables Reference

### Production (.env)
- Uses **production** Neon database branch
- Uses **public** Redis URL (yamanote.proxy.rlwy.net)
- API base: `https://api.praviel.com`
- App origin: `https://praviel.com`

### Development (.env.local)
- Uses **development** Neon database branch
- Uses **public** Redis URL (for local access)
- API base: `http://localhost:8000`
- App origin: `http://localhost:3000`

### Wrangler Dev (.dev.vars)
- Uses **development** Neon database branch
- Used by `pnpm preview` (local Cloudflare Workers simulation)
- API base: `http://localhost:8000`
- App origin: `http://localhost:8788`

---

## Deployment Checklist

### First-Time Cloudflare Workers Setup

✅ **All secrets have been configured on October 27, 2025:**
   - ✅ STACK_SECRET_SERVER_KEY
   - ✅ DATABASE_URL (Production branch: ep-small-truth-a82ceowt)
   - ✅ REDIS_URL (Public URL: yamanote.proxy.rlwy.net:12298)
   - ✅ RESEND_API_KEY
   - ✅ OPENAI_API_KEY
   - ✅ ANTHROPIC_API_KEY
   - ✅ GOOGLE_API_KEY

**To update a secret:**
```bash
export CLOUDFLARE_API_TOKEN="your-token-here"
echo "new-secret-value" | pnpm wrangler secret put SECRET_NAME --env production
```

**Deploy:**
```bash
pnpm deploy
```

### Subsequent Deployments

```bash
# Build and deploy to Cloudflare
pnpm deploy

# Or gradual deployment
pnpm upload
```

### Railway Backend Updates

- Push to `main` branch in GitHub
- Railway automatically builds and deploys
- Monitor deployment logs in Railway dashboard

---

## Security Notes

1. **Never commit sensitive data:**
   - `.env`, `.env.local`, `.dev.vars` are all gitignored
   - Only `.env.example` and `.env.local.template` are committed (with placeholder values)

2. **Cloudflare Workers secrets:**
   - Set via `wrangler secret put` command
   - Stored securely in Cloudflare, not in code or config files

3. **Railway environment variables:**
   - Set in Railway dashboard
   - Not stored in repository

4. **Database credentials:**
   - Neon uses least-privilege roles
   - Consider creating read-only roles for specific use cases
   - Rotate credentials periodically

5. **API keys:**
   - Use separate keys for production and development
   - Enable rate limiting where applicable
   - Monitor usage for anomalies

---

## Monitoring & Observability

### Cloudflare Workers
- Dashboard: https://dash.cloudflare.com
- Observability: Enabled in wrangler.jsonc
- Real-time logs available in Cloudflare dashboard

### Railway
- Dashboard: https://railway.app
- Deployment logs available per service
- Health check: `https://api.praviel.com/health`

### Neon Database
- Dashboard: https://console.neon.tech
- Metrics: Connection count, query performance
- GitHub integration for schema migrations

### Redis
- Railway dashboard provides basic metrics
- Monitor memory usage and connection count

---

## Troubleshooting

### Cloudflare Workers deployment fails
1. Check if secrets are set: `pnpm wrangler secret list`
2. Verify wrangler.jsonc syntax (JSONC allows comments)
3. Check build output for errors: `pnpm build`

### Database connection errors
1. Verify DATABASE_URL includes `?sslmode=require`
2. Check Neon dashboard for compute status
3. Ensure correct branch is being used (production vs development)

### Redis connection timeout
1. Check if using correct URL (public vs internal)
2. Verify Redis service is running in Railway
3. Test connection with `redis-cli -u <REDIS_URL>`

### Email not sending
1. Verify Resend API key is valid
2. Check DNS records are properly configured
3. Review Resend dashboard for delivery logs

---

## Contact & Support

- **Cloudflare:** https://dash.cloudflare.com/support
- **Railway:** https://railway.app/help
- **Neon:** https://neon.tech/docs
- **Resend:** https://resend.com/docs
- **Stack Auth:** https://docs.stack-auth.com

---

*Last updated: October 27, 2025*
