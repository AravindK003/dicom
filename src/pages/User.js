import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Dialog,
  Typography,
  TableContainer,
  TablePagination,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Grid
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { DialogTitle } from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
import editFill from '@iconify/icons-eva/edit-fill';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
// prettier-ignore
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '' },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }, 
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles({
  newPosOfDialog: {
    position: 'absolute',
    top: '44%',
    right: '-16%',
    textAlign: 'start',
    // maxWidth: '40%',
    // maxHeight: '90%',
    transform: 'translate(-50%, -50%)'
  }
});

export default function User() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dialog, setDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fail, setFail] = useState();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDialog = () => {
    setDialog(true);
  };

  const formik = useFormik({
    initialValues: {
      fName: '',
      lName: '',
      emailId: '',
      mobileNo: '',
      password: '',
      privilage: ''
    },
    // validationSchema: RegisterSchema,
    onSubmit: () => {
      // postData();
    }
  });

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page title="Customer | DICOM">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Role
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              handleDialog();
            }}
            startIcon={<Icon icon={plusFill} />}
          >
            New Role
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, role, status, company, avatarUrl, isVerified } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell> */}
                          <TableCell align="left">
                            <IconButton onClick={() => handleDialog()}>
                              <Icon icon={editFill} width={20} height={20} />
                            </IconButton>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {company}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{role}</TableCell>
                          <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(status === 'banned' && 'error') || 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Dialog
        open={dialog}
        classes={{
          paper: classes.newPosOfDialog
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitles1">New Role</Typography>
            </Grid>
            <Grid item xs={12} sm={6} style={{ textAlign: 'end' }}>
              <IconButton onClick={() => setDialog(false)}>
                <Icon icon={closeFill} />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <br />
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    size="small"
                    id="demo-simple-select"
                    {...getFieldProps('role')}
                    label="Role"
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="participant">Participant</MenuItem>
                    <MenuItem value="sub_host">Sub Host</MenuItem>
                    <MenuItem value="host">Host</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
                {/* <Alert icon={false} severity="error">
                  <Typography variant="caption"> {fail}</Typography>
                </Alert> */}
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save
                </Button>
              </Stack>
            </Form>
          </FormikProvider>
        </DialogContent>
      </Dialog>
    </Page>
  );
}
