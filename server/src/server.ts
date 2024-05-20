import express, { Request, Response, NextFunction } from 'express';
import { PORT } from './config';
import { getOrganizationFundraisingPages } from './api/organizations/fundraisingPages';
import { getOrganizationFundraisingTeams } from './api/organizations/fundraisingTeams';
import { getCampaignFundraisingPages } from './api/campaigns/fundraisingPages';
import { getCampaignFundraisingTeams } from './api/campaigns/fundraisingTeams';
import { tokenExpirationMiddleware, tokenStore } from './middleware/middleware';

interface RequestWithQuery extends Request {
  query: {
    sort?: string;
    record_type?: string;
  };
}

export const app = express();

app.use(tokenExpirationMiddleware);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route handler for fetching org-level fundraising pages
app.get('/fundraisingPages', async (req: RequestWithQuery, res: Response) => {
  const sort = req.query?.sort || 'total_raised:desc';
  const recordType = req.query?.record_type;

  try {
    if (!tokenStore.access_token || !tokenStore.access_token.length) {
      throw new Error('Failed to retrieve token.');
    }

    const { data } =
      recordType === 'campaign'
        ? await getCampaignFundraisingPages(tokenStore.access_token, sort)
        : await getOrganizationFundraisingPages(tokenStore.access_token, sort);

    res.send(data);
  } catch (e) {
    console.error('Error fetching fundraising pages: ', e.message);
    res.status(500).json({ error: 'Failed to fetch fundraising pages.' });
  }
});

// Route handler for fetching org-level fundraising teams
app.get('/fundraisingTeams', async (req: RequestWithQuery, res: Response) => {
  const sort = req.query?.sort || 'total_raised:desc';
  const recordType = req.query?.record_type;

  try {
    if (!tokenStore.access_token || !tokenStore.access_token.length) {
      throw new Error('Failed to retrieve token.');
    }
    const { data } =
      recordType === 'campaign'
        ? await getCampaignFundraisingTeams(tokenStore.access_token, sort)
        : await getOrganizationFundraisingTeams(tokenStore.access_token, sort);

    res.send(data);
  } catch (e) {
    console.error('Error fetching fundraising teams: ', e.message);
    res.status(500).json({ error: 'Failed to fetch fundraising teams.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
