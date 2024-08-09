'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface IPercentageCompletion {
  proposals: number;
  sales: number;
  qualifiedLeads: number;
  visits: number;
}

interface Sales {
  month: number;
  year: number;
  totalSales: number;
}

interface Targets {
  sales: number;
  qualifiedLeads: number;
  visits: number;
  proposals: number;
}

export interface IReport {
  proposals: number;
  visits: number;
  qualifiedLeads: number;
  percentageCompletion: IPercentageCompletion;
  targets: Targets;
  sales: Sales;
}

export interface ReportTableProps {
  report: IReport;
}
function Truncate(value: number) {
  return Math.trunc(value);
}

export function ReportTable({ report }: ReportTableProps) {
  if (!report) {
    return (
      <div className="py-5">
        <p className="text-center">No report available</p>
      </div>
    );
  }

  return (
    <Table className="py-5">
      <TableHeader>
        <TableRow>
          <TableHead className="text-black text-xl font-normal">#</TableHead>
          <TableHead className="text-black text-xl font-normal">
            Metrics
          </TableHead>
          <TableHead className="text-black text-xl font-normal">
            Count
          </TableHead>
          <TableHead className="text-center text-black text-xl font-normal">
            Goal
          </TableHead>
          <TableHead className="text-center text-black text-xl font-normal">
            Percentage
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium ">1</TableCell>
          <TableCell className="font-medium ">Visits</TableCell>
          <TableCell>{report.visits}</TableCell>
          <TableCell className="text-center">{report.targets.visits}</TableCell>
          <TableCell className="text-center">
            {Truncate(report.percentageCompletion.visits)}%
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium ">2</TableCell>
          <TableCell className="font-medium ">Qualified Leads</TableCell>
          <TableCell>{report.qualifiedLeads}</TableCell>
          <TableCell className="text-center">
            {report.targets.qualifiedLeads}
          </TableCell>
          <TableCell className="text-center">
            {Truncate(report.percentageCompletion.qualifiedLeads)}%
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium ">3</TableCell>
          <TableCell className="font-medium ">Proposals</TableCell>
          <TableCell>{report.proposals}</TableCell>
          <TableCell className="text-center">
            {report.targets.proposals}
          </TableCell>
          <TableCell className="text-center">
            {Truncate(report.percentageCompletion.proposals)}%
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium ">4</TableCell>
          <TableCell className="font-medium ">Sales</TableCell>
          <TableCell>{report.sales?.totalSales}</TableCell>
          <TableCell className="text-center">{report.targets.sales}</TableCell>
          <TableCell className="text-center">
            {Truncate(report.percentageCompletion.sales)}%
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
