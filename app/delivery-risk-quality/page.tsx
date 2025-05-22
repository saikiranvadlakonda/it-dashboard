"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DeliveryRiskQuality } from "@/components/delivery-risk-quality"
import { ProductionStability } from "@/components/production-stability"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DeliveryRiskQualityPage() {
  return (
    <div className="flex-1 overflow-auto p-6">
      <Tabs defaultValue="delivery" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="delivery">Delivery & Milestones</TabsTrigger>
          <TabsTrigger value="stability">Production Stability</TabsTrigger>
          <TabsTrigger value="risk-register">Risk Register</TabsTrigger>
        </TabsList>
        <TabsContent value="delivery">
          <DeliveryRiskQuality />
        </TabsContent>
        <TabsContent value="stability">
          <ProductionStability />
        </TabsContent>
        <TabsContent value="risk-register">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Risk Register</CardTitle>
              <CardDescription>Consolidated view of risks across delivery, operations, and compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Risk ID</TableHead>
                    <TableHead>Risk Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Mitigation Plan</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>RISK-001</TableCell>
                    <TableCell>LifePro upgrade timeline at risk due to vendor delays</TableCell>
                    <TableCell>Delivery</TableCell>
                    <TableCell>Wave</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                        High
                      </span>
                    </TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Escalate to vendor management; consider phased approach</TableCell>
                    <TableCell>Open</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RISK-002</TableCell>
                    <TableCell>Legacy authentication system vulnerability</TableCell>
                    <TableCell>Security</TableCell>
                    <TableCell>ServiceNow</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                        High
                      </span>
                    </TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Implement temporary security controls; expedite upgrade</TableCell>
                    <TableCell>In Progress</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RISK-003</TableCell>
                    <TableCell>Resource constraints for Data Lake implementation</TableCell>
                    <TableCell>Resourcing</TableCell>
                    <TableCell>ADO</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                        Medium
                      </span>
                    </TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>Reallocate resources from lower priority initiatives</TableCell>
                    <TableCell>Open</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RISK-004</TableCell>
                    <TableCell>Regulatory compliance deadline for new privacy requirements</TableCell>
                    <TableCell>Compliance</TableCell>
                    <TableCell>Wave</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                        High
                      </span>
                    </TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Dedicated compliance team; bi-weekly progress reviews</TableCell>
                    <TableCell>In Progress</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RISK-005</TableCell>
                    <TableCell>Claims system performance degradation</TableCell>
                    <TableCell>Operational</TableCell>
                    <TableCell>ServiceNow</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                        Medium
                      </span>
                    </TableCell>
                    <TableCell>Medium</TableCell>
                    <TableCell>Performance tuning; infrastructure scaling</TableCell>
                    <TableCell>Open</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RISK-006</TableCell>
                    <TableCell>Integration challenges between new CRM and legacy systems</TableCell>
                    <TableCell>Technical</TableCell>
                    <TableCell>ADO</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800">
                        Medium
                      </span>
                    </TableCell>
                    <TableCell>High</TableCell>
                    <TableCell>API strategy review; additional integration testing</TableCell>
                    <TableCell>In Progress</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
